import React from 'react'

const Columns = [
    {
        name: "Name",
        selector: (row) => row.name,
      },
      {
        name: "User Name",
        selector: (row) => row.username,
      },
      {
        name: "Email",
        selector: (row) => row.email,
      },
      {
        name: "Action",
        selector: (row) => row.email,
      },
];
export default Columns