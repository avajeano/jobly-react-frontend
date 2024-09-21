/**
 * List of companies. 
 */

import React, { useEffect, useState } from "react";
import Card from "./Card";
import API from "./api";
import "./CompanyList.css";

function CompaniesList() {
    const [companies, setCompanies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCompanies() {
            setLoading(true);
            try {
                const companiesData = await API.getCompanies(searchQuery);
                setCompanies(companiesData);
            } catch (err) {
                console.error("error fetching companies:", err);
            }
            setLoading(false);
        }
        fetchCompanies();
    }, [searchQuery]);

    return (
        <div>
            {/* search bar */}
            <input className="search"
             type="text"
             placeholder="search company"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
            />

            {loading ? (
                <p>loading companies...</p>
            ) : (
                <div className="company-list">
                    {companies.length > 0 ? (
                        companies.map((company) => (
                            <Card 
                                type="company" 
                                data={{ 
                                    handle: `${company.handle}`, 
                                    name: `${company.name}`, 
                                    description: `${company.description}`, 
                                    }} 
                                key={company.id} 
                                company={company} />
                        ))
                    ) : (
                        <p>no companies found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default CompaniesList;