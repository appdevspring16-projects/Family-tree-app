import { supabase } from './supabase'
import './style.css'

const authDiv = document.getElementById('auth')
const appDiv = document.getElementById('app')

document.getElementById('loginBtn').onclick = login
document.getElementById('addBtn').onclick = addPerson

async function login() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (!error) {
    authDiv.style.display = 'none'
    appDiv.style.display = 'block'
    loadPeople()
  } else {
    alert(error.message)
  }
}

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
