// AddGroupInCeremonies.js
import { addGroupsInACeremony } from "../redux/GroupsInACeremoniesSlice";

export const prepareDataForApi = (
  selectedCeremoniesName,
  selectedGroups,
  groupsWithId,
  invitationType
) => {
  const dataToSend = {
    ceremonies: selectedCeremoniesName
      .filter((ceremony) => selectedGroups[ceremony.id]?.length > 0) // Filter out ceremonies with no selected groups
      .map((ceremony) => ({
        ceremony_id: ceremony.id,
        group_data: (selectedGroups[ceremony.id] || []).map((groupId) => {
          const selectedGroup = groupsWithId.find(
            (group) => group.groupname === groupId
          );
          return {
            group_id: selectedGroup?.id,
            selected: true,
            invitation_type: invitationType, // Add the invitation_type here
          };
        }),
      })),
  };

  return dataToSend;
};

export const handleData = async (dataToSend, dispatch, navigate) => {
  if (dataToSend?.ceremonies?.length > 0) {
    // Dispatch the action to send data to the API
    await dispatch(addGroupsInACeremony(dataToSend));
    navigate("/shiv_app/guest/questions");
  } else {
    // Handle the case where no groups are selected
    alert("Please select at least one group for a ceremony.");
  }
};
