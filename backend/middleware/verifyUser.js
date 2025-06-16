import supabase from '../config/supabase.js'

const verifySupabaseUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid token' })
    }

    const token = authHeader.split(' ')[1]
    const { data: user, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    req.user = user
    next()
  } catch (err) {
    console.error('Auth Middleware Error:', err)
    res.status(500).json({ error: 'Server error in auth middleware' })
  }
}

export default verifySupabaseUser