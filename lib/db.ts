import { sql } from '@vercel/postgres'

export async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS survey_responses (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(320) NOT NULL,
        profession VARCHAR(255) NOT NULL,
        club VARCHAR(255),
        softwares_used TEXT NOT NULL,
        main_difficulties TEXT NOT NULL,
        favorite_tools TEXT NOT NULL,
        essential_features TEXT NOT NULL,
        gaps TEXT NOT NULL,
        additional_feedback TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
  } catch (error) {
    console.error('Database initialization error:', error)
  }
}

export async function saveSurveyResponse(data: {
  name: string
  email: string
  profession: string
  club?: string
  softwaresUsed: string[]
  mainDifficulties: string[]
  favoriteTools: string[]
  essentialFeatures: string[]
  gaps: string[]
  additionalFeedback?: string
}) {
  try {
    const result = await sql`
      INSERT INTO survey_responses (
        name,
        email,
        profession,
        club,
        softwares_used,
        main_difficulties,
        favorite_tools,
        essential_features,
        gaps,
        additional_feedback
      ) VALUES (
        ${data.name},
        ${data.email},
        ${data.profession},
        ${data.club || null},
        ${JSON.stringify(data.softwaresUsed)},
        ${JSON.stringify(data.mainDifficulties)},
        ${JSON.stringify(data.favoriteTools)},
        ${JSON.stringify(data.essentialFeatures)},
        ${JSON.stringify(data.gaps)},
        ${data.additionalFeedback || null}
      )
      RETURNING id
    `
    return { success: true, id: result.rows[0].id }
  } catch (error) {
    console.error('Error saving survey response:', error)
    throw error
  }
}

export async function getAllResponses() {
  try {
    const result = await sql`
      SELECT * FROM survey_responses
      ORDER BY created_at DESC
    `
    return result.rows.map((row: any) => ({
      ...row,
      softwaresUsed: JSON.parse(row.softwares_used),
      mainDifficulties: JSON.parse(row.main_difficulties),
      favoriteTools: JSON.parse(row.favorite_tools),
      essentialFeatures: JSON.parse(row.essential_features),
      gaps: JSON.parse(row.gaps),
    }))
  } catch (error) {
    console.error('Error fetching responses:', error)
    return []
  }
}
