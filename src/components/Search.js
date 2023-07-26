import React from "react";

export default function Search ({searchTerm, onSearchChange}){

 

    return(
        
//Search bar DOM 
        <div>
            <label>Search for a Transaction</label>
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Use description to search:"
        />
        </div>
    )
}