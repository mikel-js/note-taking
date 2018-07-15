import { initializedEditPage, generateLastEdited } from './views'
import { updateNote, removeNote } from './notes'

let noteId = location.hash.substring(1)
let noteTitle = document.querySelector('#note-title')
let noteUpdated = document.querySelector('#note-updated')
const noteBody = document.querySelector('#note-body')
let removeButton = document.querySelector('#remove-note')

initializedEditPage(noteId)

noteTitle.addEventListener('input', (e)=>{
    let note = updateNote(noteId, {
        title: e.target.value
    })
    noteUpdated.textContent = generateLastEdited(note.updatedAt)
})

noteBody.addEventListener('input', (e)=>{
    let note = updateNote(noteId, {
       body: e.target.value 
    })
    noteUpdated.textContent = generateLastEdited(note.updatedAt)
})

removeButton.addEventListener('click', ()=>{
    removeNote(noteId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e)=>{
    if(e.key === 'notes'){
        initializedEditPage(noteId)
    }
})