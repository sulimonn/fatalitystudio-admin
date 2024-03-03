import React from 'react';
import { useParams } from 'react-router-dom';

// project imports
import MemberForm from './MemberForm';
import { useGetTeamQuery } from 'store/reducers/team';

const UpdateMember = () => {
  const { id } = useParams();
  const { data: members = [] } = useGetTeamQuery();
  const member = members.find((member) => member.id.toString() === id);
  return <MemberForm id={id} member={member} />;
};

export default UpdateMember;
