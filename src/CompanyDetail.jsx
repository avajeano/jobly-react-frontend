/**
 * Individual company.
 * /companies/:handle
 */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "./api";
import Card from "./Card";

function CompanyDetail() {
    const { handle } = useParams();
    const [company, setCompany] = useState(null);
  
    useEffect(() => {
        async function fetchCompany() {
            const companyData = await API.getCompany(handle);
            setCompany(companyData);
        }
        fetchCompany();
    }, [handle])

    if (!company) return <div>Loading...</div>;

    return (
        <div>
            <h1>{company.name}</h1>
            <p>{company.description}</p>
                <div>
                    {company.jobs.map((job) => (
                        <Card
                        key={job.id}
                        type="job"
                        data={{
                            id: job.id,
                            title: `${job.title}`,
                            companyName: `${job.companyName}`,
                            salary: `${job.salary}`,
                            equity: `${job.equity}`
                        }}
                        job={job} />
                    ))}
                </div>
        </div>
    );
}

export default CompanyDetail;