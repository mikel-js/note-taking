import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'

const generateNoteDOM =(note)=> {
    const noteEl =document.createElement('a')
    const textEl = document.createElement('p')
    let statusEl = document.createElement('p')
    // title text
    if(note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
    return noteEl
}

const renderNotes = ()=> {
    let notesEl =  document.querySelector('#notes')
    let filters = getFilters()
    let notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((note)=> 
        note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    )

    notesEl.innerHTML = ''
    
    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note)=> {
        const noteEl = generateNoteDOM(note)
        notesEl.appendChild(noteEl)
    })
    } else {
        let emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'Nothing to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }

    
}

let initializedEditPage =(noteId)=> {
    let noteTitle = document.querySelector('#note-title')
    let noteUpdated = document.querySelector('#note-updated')
    let noteBody = document.querySelector('#note-body')
    let notes = getNotes()
    let note = notes.find((note)=>note.id === noteId)

    if (!note) {
        location.assign('/index.html')
    } 

    noteTitle.value = note.title
    noteBody.value = note.body
    noteUpdated.textContent = generateLastEdited(note.updatedAt)
}

let generateLastEdited =(timestamp)=> {
    return `Last edited ${moment(timestamp).fromNow()}`
}

export {generateNoteDOM, renderNotes, generateLastEdited, initializedEditPage}