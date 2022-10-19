import React , {useState} from 'react'
import { useNavigate } from "react-router-dom";

const Search = () => {

    const [keyword , setKeyword] = useState('')

    const navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate("/search");
        }
    };


    return (
            <form id='searchForm' onSubmit={searchHandler}>
                <div className="search">
                    <button type="submit" className="searchButton">
                        <i className="fa fa-search"></i>
                    </button>
                    <input 
                        id='search' 
                        type="text" 
                        className="searchTerm" 
                        placeholder="دنبال چی هستی؟"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
            </form>    
    )
}

export default Search