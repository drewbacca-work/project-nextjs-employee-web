import ContentWrapper from "@/components/Content/ContentWrapper";
import ViewContent from "@/components/Content/ViewContent";
import { getIntl } from "@/lib/intl";

export default async function View({ params }: { params: { locale: string } }) {
  const intl = await getIntl(params.locale);

  const labels = {
    sn: intl.formatMessage({ id: "view.col.sn" }),
    profile: intl.formatMessage({ id: "view.col.profile" }),
    name: intl.formatMessage({ id: "view.col.name" }),
    salary: intl.formatMessage({ id: "view.col.salary" }),
    age: intl.formatMessage({ id: "view.col.age" }),
    action: intl.formatMessage({ id: "view.col.action" }),
    edit: intl.formatMessage({ id: "view.col.edit" }),
  };

  return (
    <ContentWrapper>
      <ViewContent labels={labels} />
    </ContentWrapper>
  );
}
