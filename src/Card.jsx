/**
 * Dynamic card component.
 * Company || Job
 * Apply || Applied button for Job cards
 */

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import UserContext from "./UserContext";
import API from "./api";
import useLocalStorage from "./useLocalStorage";

const Card = ({ type, data }) => {
    const { currentUser } = useContext(UserContext);
    const [applied, setApplied] = useLocalStorage(`applied-${data.id}`, false);
    const [error, setError] = useState(null);

    const handleApply = async () => {
        if (!currentUser) {
            setError("you must be logged in to apply for a job");
            return;
        }
        if (!data.id) {
            setError("job id is missing, cannot apply to job")
            return;
        }
        try {
            // apply to the job using the api
            const response = await API.applyToJob(currentUser.username, data.id);

            // update the applied state only if the respone was successful
            if (response.success) {
                // updated state to reflect that the job was applied to 
                setApplied(true);
                // clear any previous error
                setError(null);
            } else {
                throw new Error("application failed");
            }
        } catch (error) {
            console.error("failed to apply for job", error);
            setError("failed to apply for job, please try again");
        }
    };

    return (
        <div className="card">
            {type === "company" ? (
                <>
                    <Link to={`/companies/${data.handle}`} ><h2>{data.name}</h2></Link>
                    <p>{data.description}</p>
                    <p>{data.location}</p>
                </>
            ) : (
                <>
                    <h2>{data.title}</h2>
                    <h4>{data.companyName}</h4>
                    <p>Salary: {data.salary}</p>
                    <p>Equity: {data.equity}</p>
                    {/* show apply button only if user is logged in */}
                    {currentUser && (
                        <button onClick={handleApply} disabled={applied}>
                            {applied ? "Applied" : "Apply"}
                        </button>
                    )}
                    {/* display error message */}
                    {error && <p>{error}</p>}
                </>
            )}
        </div>
    );
};

export default Card;