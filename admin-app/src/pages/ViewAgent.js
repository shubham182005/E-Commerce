import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAAgent, getAgents } from "../features/agent/agentSlice";
import { getleadUsers } from "../features/leaduser/leaduserSlice";

const ViewAgent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAgentId = location.pathname.split("/")[3];

  const agentState = useSelector((state) => state.agent.agent);
  const agentStates = useSelector((state) => state?.agent?.agents);
  const leaduserState = useSelector((state) => state.leaduser.leadusers);

  const [agentLeads, setAgentLeads] = useState([]);

  useEffect(() => {
    dispatch(getAAgent(getAgentId));
  }, [dispatch, getAgentId]);

  useEffect(() => {
    dispatch(getAgents());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getleadUsers());
  }, [dispatch]);

  useEffect(() => {
    // Find the leads for the specific agent
    const leads = leaduserState.filter((lead) => lead.agent._id === getAgentId);
    setAgentLeads(leads);
  }, [leaduserState, getAgentId]);
  console.log(agentLeads);
  return (
    <div>
      <h1>View Agent</h1>
      <div>{agentState?.name}</div>
      <h2>Leads for {agentState?.name}</h2>
      <ul>
        {agentLeads.map((lead) => (
          <li key={lead.id}>{lead.Customer_Name}</li> // Adjust based on lead's data structure
        ))}
      </ul>
    </div>
  );
};

export default ViewAgent;
