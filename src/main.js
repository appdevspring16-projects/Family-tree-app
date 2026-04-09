import { supabase } from './supabase'
import './style.css'

// Hook up button
document.getElementById('addBtn').onclick = addPerson

async function addPerson() {
  const first = document.getElementById('first').value
  const last = document.getElementById('last').value
  const file = document.getElementById('photo').files[0]

  let photo_url = null

  if (file) {
    const filePath = `public/${Date.now()}-${file.name}`

    const { data, error } = await supabase.storage
      .from('photos')
      .upload(filePath, file)

    if (!error) {
      photo_url = data.path
    } else {
      console.error("Upload error:", error)
    }
  }

  const { error } = await supabase.from('people').insert([
    { first_name: first, last_name: last, photo_url }
  ])

  if (error) {
    console.error("Insert error:", error)
  }

  loadPeople()
}

async function loadPeople() {
  const { data, error } = await supabase.from('people').select('*')

  if (error) {
    console.error("Fetch error:", error)
    return
  }

  const list = document.getElementById('people')
  list.innerHTML = ''

  data.forEach(p => {
    const li = document.createElement('li')
    li.innerText = `${p.first_name} ${p.last_name}`
    list.appendChild(li)
  })
}

// ✅ Load data when page is ready
document.addEventListener('DOMContentLoaded', () => {
  loadPeople()
})
