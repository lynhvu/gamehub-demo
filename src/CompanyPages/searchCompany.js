

const CompSearch = (props) => {
    return (
        <div>
            <form id="search-comp">
                <label for="search" id="search-sort">
                    Search: 
                    </label>
                <input type="text" name="search" id="search" placeholder="Search Companies"></input>
                <button name="search_btn" className="searchbttn">Search</button>
                <button name="reset" type="reset" className="searchbttn">Reset</button>
            </form>
        </div>
    )
}

export default CompSearch;