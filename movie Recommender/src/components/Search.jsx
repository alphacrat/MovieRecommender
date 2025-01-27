import React from 'react'

const Search = (props) => {
    const { searchTerm, setSearchTerm } = props
    //property of rect, we should not mutate states

    return (
        <div className='search'>
            <div>
                <img src="./search.svg" alt="searchIcon" />
                <input
                    placeholder='Search 1000s of movies according to your mood'
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Search
