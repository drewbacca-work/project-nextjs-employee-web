import ContentWrapper from "@/components/Content/ContentWrapper";
import EditContent from "@/components/Content/EditContent";
import { getIntl } from "@/lib/intl";

export default async function Add({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { userId: number };
}) {
  const intl = await getIntl(params.locale);
  const labels = {
    profile: intl.formatMessage({ id: "view.col.profile" }),
    firstName: intl.formatMessage({ id: "add.edit.firstname" }),
    lastName: intl.formatMessage({ id: "add.edit.lastname" }),
    salary: intl.formatMessage({ id: "add.edit.salary" }),
    age: intl.formatMessage({ id: "add.edit.age" }),
    upload: intl.formatMessage({ id: "add.edit.button.upload" }),
    submit: intl.formatMessage({ id: "add.edit.button.submit" }),
    noFound: intl.formatMessage({ id: "edit.no.found" }),
  };

  return (
    <ContentWrapper>
      <EditContent userId={searchParams.userId} labels={labels} />
    </ContentWrapper>
  );
}
