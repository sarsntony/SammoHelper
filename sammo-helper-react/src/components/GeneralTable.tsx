import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
} from 'material-react-table';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { listGenerals } from '../graphql/queries';
import { General } from '../API';

export default function GeneralTable() {
  Amplify.configure({
    API: {
      GraphQL: {
        endpoint: 'https://occnmndw4fffxigyer4rpcunrm.appsync-api.us-east-1.amazonaws.com/graphql',
        region: 'us-east-1',
        defaultAuthMode: 'apiKey',
        apiKey: 'da2-f25kzp2vdnevde4ily3luu3o64'
      }
    }
  });

  const [generals, setGenerals] = useState<General[]>([]);
  useEffect(() => {
    const client = generateClient();
    const getGenerals = async () => {
      const result = await client.graphql({
        query: listGenerals,
        variables: {
          server: '체67기'
        }
      });
      const generalArray: General[] = [];
      if (result && result.data && result.data.listGenerals) {
       for (const general of result.data.listGenerals) {
          generalArray.push(general as General);
        }
      };

      setGenerals(generalArray);
    }
    getGenerals();
  }, []);
  /*
  
  action?: string | null,
  content?: string | null,
  country?: string | null,
  createdAt: string,
  lastActions?: string | null,
  name: string,
  server: string,
  time?: string | null,
  unitClass?: string | null,
  unitType?: string | null,
  updatedAt: string,
  */

  const columns = useMemo<MRT_ColumnDef<General>[]>(
    () => [
      {
        accessorKey: 'name',
        header: '장수명',
        enableHiding: false,
      },
      {
        accessorKey: 'country',
        header: '나라',
        enableHiding: false,
        filterVariant: 'multi-select',
      },
      {
        accessorKey: 'time',
        header: '턴시간',
        enableHiding: false,
      },
      {
        accessorKey: 'unitClass',
        header: '병종',
        enableHiding: false,
      },
      {
        accessorKey: 'unitType',
        header: '세부병종',
        enableHiding: false,
      },
    ],
    [],
  );

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: generals, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableFacetedValues : true,
    enableRowSelection: false, //enable some features
    enableColumnActions: false,
    enableColumnOrdering: false, //enable a feature for all columns
    enableGlobalFilter: false, //turn off a feature
    enablePagination: false,     
    initialState: {
      showColumnFilters: true,
      sorting: [
        {
          id: 'time',
          desc: false
        }
      ]
    }
  });

  return <MaterialReactTable table={table} />;
}