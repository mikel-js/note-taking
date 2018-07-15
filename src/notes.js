import uuidv4 from 'uuid/v4'
import moment from 'moment'

let notes = []

let loadNotes = function () {
    let notesJSON = localStorage.getItem('notes')

    if (notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

// save to local storage
let saveNotes = function() {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// expose notes from module
let getNotes = () => notes

let createNote =() => {
	let id =  uuidv4()
    let timestamp = moment().valueOf()
    notes.push({
         id: id,
         title: '',
         body: '',
         createdAt: timestamp,
         updatedAt: timestamp
     })
    saveNotes()
    return id
}

let removeNote = function (id) {
    let notesIndex = notes.findIndex(function (notes){
        return notes.id === id
    })
    if (notesIndex > -1) {
        notes.splice(notesIndex, 1)
        saveNotes()
    }
}

// sort notes by one in 3 ways
let sortNotes = function (sortBy) {
    if (sortBy === 'byEdited') {
        return notes.sort(function (a, b){
            if (a.updatedAt > b.updatedAt){
                return -1
            } else if (a.updatedAt < b.updatedAt){
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort(function (a, b){
            if (a.createdAt > b.createdAt){
                return -1
            } else if (a.createdAt < b.createdAt){
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort(function(a, b){
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else if (a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            } else {
                return 0
            }
        })
    }    
        else {
        return notes
    }
}

let updateNote =(id, updates)=> {
    let note = notes.find((note)=> note.id === id)

    if (!note) {
        return
    }
    if (typeof updates.title === 'string') {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }
    if (typeof updates.body === 'string') {
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }
    saveNotes()
    return note
}

notes = loadNotes()

export { getNotes, createNote, removeNote, sortNotes, updateNote }