import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/shadcn/breadcrumb";
import { Separator } from "@repo/ui/components/shadcn/separator";
import { SidebarTrigger } from "@repo/ui/components/shadcn/sidebar";

type PageHeaderProps = {
  title: string;
  breadcrumb: {
    label: string;
    href: string;
  }[];
};

const PageHeader = ({ title, breadcrumb }: PageHeaderProps) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((item) => (
              <BreadcrumbItem className="hidden md:block" key={item.href}>
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
            ))}
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default PageHeader;
