/**
 * List of jobs.
 */

import React, { useEffect, useState } from "react";
import Card from "./Card";
import API from "./api";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchJobs() {
            setLoading(true);
            try {
                const jobsData = await API.getJobs();
                setJobs(jobsData);
            } catch (err) {
                console.error("error fetching jobs:", err);
            }
            setLoading(false);
        }
        fetchJobs();
    }, []);

    return (
        <div>
            {jobs.map((job) => (
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
    )
}

export default Jobs;