import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AuthForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  const handleAuth = async () => {
    setLoading(true)
    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

    if (error) alert(error.message)
    else alert(isLogin ? "Login effettuato!" : "Registrazione avvenuta, controlla l’email.")

    setLoading(false)
  }

  return (
    <div className="p-4 border rounded-xl max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? "Accedi a Jarvis" : "Crea un nuovo account"}
      </h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        onClick={handleAuth}
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded font-bold"
      >
        {loading ? "Attendere..." : isLogin ? "Accedi" : "Registrati"}
      </button>

      <div className="text-center mt-4 text-sm">
        {isLogin ? (
          <span>
            Non hai un account?{" "}
            <button onClick={() => setIsLogin(false)} className="text-blue-500 underline">
              Registrati
            </button>
          </span>
        ) : (
          <span>
            Hai già un account?{" "}
            <button onClick={() => setIsLogin(true)} className="text-blue-500 underline">
              Accedi
            </button>
          </span>
        )}
      </div>
    </div>
  )
}

