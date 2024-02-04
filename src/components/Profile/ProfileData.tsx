export const ProfileData = ({
  graphData: { givenName, surname, userPrincipalName, id },
}) => (
  <div id="profile-div">
    <p>
      <strong>First Name: </strong> {givenName}
    </p>
    <p>
      <strong>Last Name: </strong> {surname}
    </p>
    <p>
      <strong>Email: </strong> {userPrincipalName}
    </p>
    <p>
      <strong>Id: </strong> {id}
    </p>
  </div>
);

export default ProfileData;
