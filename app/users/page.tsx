'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
      
      if (error) {
        console.error('Erro:', error)
      } else {
        setUsers(data)
      }
      setLoading(false)
    }

    fetchUsers()
  }, [])

  if (loading) return <p>Carregando...</p>

  return (
    <div>
      <h1>Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email} - {user.plan}</li>
        ))}
      </ul>
    </div>
  )
}