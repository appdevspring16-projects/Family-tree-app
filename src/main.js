import { supabase } from './supabase'
import './style.css'

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
    }
  }

  await supabase.from('people').insert([
    { first_name: first, last_name: last, photo_url }
  ])

  loadPeople()
}

async function loadPeople() {
  const { data } = await supabase.from('people').select('*')

  const list = document.getElementById('people')
  list.innerHTML = ''

  data.forEach(p => {
    const li = document.createElement('li')
    li.innerText = `${p.first_name} ${p.last_name}`
    list.appendChild(li)
  })
}
