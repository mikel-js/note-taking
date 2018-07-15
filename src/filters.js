let filters = {
    searchText: '',
    sortBy: 'byEdited'
}

let getFilters = ()=> filters

let setFilters = (updates) => {
    if (typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText
    }
    if (typeof updates.sortBy === 'string') {
        filters.sortBy = updates.sortBy
    }
}

export { getFilters, setFilters }