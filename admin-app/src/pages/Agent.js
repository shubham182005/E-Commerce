import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAAgent, getAgents } from "../features/agent/agentSlice";

const Agent = () => {
  const dispatch = useDispatch();
  const  agents  = useSelector((state) => state.agent.agents);
  useEffect(() => {
    dispatch(getAgents());
  }, []);
  // console.log(agents);
  return (
    <div>
      <h1 className="text-xl">Agents</h1>
      <>
        {agents &&
          agents.map((agent) => (
            <div key={agent.id}>
              <h2>{agent.name}</h2>
              <p>{agent.email}</p>
              <p className="">{agent.phone}</p>
            </div>
          ))}
      </>
    </div>
  );
};

export default Agent;
