"use client";

import useOrigin from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "@/components/ui/api-alert";

interface IApiListProps {
  entityName: string;
  entityIdName: string;
}
const ApiList: React.FC<IApiListProps> = ({ entityIdName, entityName }) => {
  const params = useParams();
  const origin = useOrigin();
  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title='GET'
        variant='public'
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title='GET'
        variant='public'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title='POST'
        variant='admin'
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title='PATCH'
        variant='admin'
        description={`${baseUrl}/${entityName}`}
      />
    </>
  );
};

export default ApiList;
