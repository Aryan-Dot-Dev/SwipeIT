import supabase from "../config/supabase.js";

const signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: name,
                role: role
            },
        },
    })

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
        message: "User registered successfully",
        user: data.user,
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
        message: "User logged in successfully",
        user: data.user,
        session: data.session
    });
}

export { signup, login };