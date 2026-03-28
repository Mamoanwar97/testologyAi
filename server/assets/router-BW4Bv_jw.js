import { useMatchRoute, Link, createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, notFound, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Component } from "react";
import { Button as Button$1 } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Youtube, Facebook, Linkedin } from "lucide-react";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Button$1,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxs("div", { className: "flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: `${"/testologyAi/"}robot.png`,
            alt: "Za'atar — Testology mascot looking confused",
            className: "mb-8 h-48 w-auto opacity-80 sm:h-64"
          }
        ),
        /* @__PURE__ */ jsx("h1", { className: "mb-2 text-2xl font-bold text-foreground", children: "Oops! Something went wrong" }),
        /* @__PURE__ */ jsx("p", { className: "mb-6 max-w-md text-muted-foreground", children: "Za'atar ran into an unexpected error. Try refreshing the page or going back to the home page." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => window.location.reload(), children: "Refresh Page" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/testologyAi/",
              className: buttonVariants() + " no-underline",
              children: "Go Home"
            }
          )
        ] }),
        this.state.error && /* @__PURE__ */ jsx("pre", { className: "mt-8 max-w-lg overflow-auto rounded-lg bg-muted p-4 text-left text-xs text-muted-foreground", children: this.state.error.message })
      ] });
    }
    return this.props.children;
  }
}
function WhatsAppIcon({ size = 20 }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" }),
        /* @__PURE__ */ jsx("path", { d: "M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" })
      ]
    }
  );
}
const socialLinks = [
  {
    href: "https://youtube.com/@testologygeeks?si=G00dkV08idhW44vD",
    icon: Youtube,
    label: "YouTube"
  },
  {
    href: "https://www.facebook.com/groups/750516570186092",
    icon: Facebook,
    label: "Facebook"
  },
  {
    href: "https://www.linkedin.com/in/omar-zidan-%F0%9F%8D%89-56b851108",
    icon: Linkedin,
    label: "LinkedIn"
  },
  {
    href: "https://chat.whatsapp.com/DkquGZvYaVl6LhhWE7CznY",
    icon: WhatsAppIcon,
    label: "WhatsApp"
  }
];
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx("footer", { className: "mt-auto border-t border-border px-4 py-6 text-muted-foreground", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-sm sm:flex-row sm:text-left", children: [
    /* @__PURE__ */ jsxs("p", { className: "m-0", children: [
      "© ",
      year,
      " TestologyAI. All rights reserved."
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: socialLinks.map(({ href, icon: Icon, label }) => /* @__PURE__ */ jsx(
      "a",
      {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": label,
        className: "text-muted-foreground transition-colors hover:text-foreground",
        children: /* @__PURE__ */ jsx(Icon, { size: 20 })
      },
      label
    )) }),
    /* @__PURE__ */ jsx("p", { className: "m-0 text-xs", children: "Practice smarter, certify faster." })
  ] }) });
}
function Header() {
  const matchRoute = useMatchRoute();
  const isExamRoute = matchRoute({
    to: "/certificates/$certId/chapters/$chapterId/exam",
    fuzzy: false
  });
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 border-b border-border bg-background/80 px-4 backdrop-blur-lg", children: /* @__PURE__ */ jsxs("nav", { className: "mx-auto flex max-w-6xl items-center justify-between py-3", children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/",
        "aria-label": "testologyAI Home",
        className: "flex items-center gap-2 text-lg font-bold tracking-tight text-foreground no-underline",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: `${"/testologyAi/"}favicon-logo.png`,
              alt: "",
              className: "h-8 w-8"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "TestologyAI" })
        ]
      }
    ),
    isExamRoute ? (
      /* Timer slot — visible in center when in exam mode */
      /* @__PURE__ */ jsx("div", { id: "exam-timer-slot" })
    ) : (
      /* Nav links */
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-sm font-medium sm:gap-2", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/",
            className: "rounded-lg px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground [&.active]:text-foreground",
            activeOptions: { exact: true },
            activeProps: {
              className: "rounded-lg px-3 py-2 text-foreground transition hover:bg-muted"
            },
            children: "Home"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/certificates",
            className: "rounded-lg px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground [&.active]:text-foreground",
            activeProps: {
              className: "rounded-lg px-3 py-2 text-foreground transition hover:bg-muted"
            },
            children: "Certificates"
          }
        )
      ] })
    ),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(
      "a",
      {
        href: "https://www.linkedin.com/in/omar-zidan-%F0%9F%8D%89-56b851108",
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "Omar Zidan's LinkedIn profile",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: `${"/testologyAi/"}avatar.png`,
            alt: "User avatar",
            className: "h-12 w-12 rounded-full border-2 border-border object-cover transition hover:border-primary"
          }
        )
      }
    ) })
  ] }) });
}
const seo = ({
  title,
  description,
  keywords,
  image
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    ...keywords ? [{ name: "keywords", content: keywords }] : [],
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    // { name: "twitter:creator", content: "@tannerlinsley" },
    // { name: "twitter:site", content: "@tannerlinsley" },
    ...image ? [
      { property: "og:image", content: image },
      { name: "twitter:image", content: image },
      { name: "twitter:card", content: "summary_large_image" }
    ] : [{ name: "twitter:card", content: "summary" }]
  ];
  return tags;
};
const appCss = "/testologyAi/assets/styles-m5dheDN4.css";
const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;
const Route$7 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#1A2744" },
      { property: "og:site_name", content: "TestologyAI" },
      ...seo({
        title: "TestologyAI — IT Certification Practice Exams",
        description: "Practice smarter, certify faster. Free practice exams and study tools for AWS, Azure, CompTIA, and more IT certifications.",
        image: `${"/testologyAi/"}thumbnail.png`
      })
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "icon",
        href: `${"/testologyAi/"}favicon-logo.png`,
        type: "image/png"
      },
      {
        rel: "icon",
        href: `${"/testologyAi/"}thumbnail.png`,
        type: "image/png"
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("script", { dangerouslySetInnerHTML: { __html: THEME_INIT_SCRIPT } }),
      /* @__PURE__ */ jsx(HeadContent, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "flex min-h-screen flex-col font-sans antialiased", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#main-content",
          className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none",
          children: "Skip to main content"
        }
      ),
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx("div", { id: "main-content", className: "flex-1", children }) }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$6 = () => import("./_-Bb7zsGzO.js");
const Route$6 = createFileRoute("/$")({
  head: () => ({
    meta: seo({
      title: "Page Not Found — TestologyAI",
      description: "This page does not exist."
    })
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./index-bnsX65YC.js");
const Route$5 = createFileRoute("/")({
  head: () => ({
    meta: seo({
      title: "TestologyAI — IT Certification Practice Exams",
      description: "Practice smarter, certify faster. Free practice exams and study tools for AWS, Azure, CompTIA, and more IT certifications.",
      image: `${"/testologyAi/"}thumbnail.png`
    })
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-DYBs3SOC.js");
const Route$4 = createFileRoute("/certificates/")({
  head: () => ({
    meta: seo({
      title: "Certificates — TestologyAI",
      description: "Browse IT certification practice exams. AWS Cloud Practitioner, Azure Fundamentals, CompTIA A+, and more.",
      image: `${"/testologyAi/"}thumbnail.png`
    })
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const certificatesData = [
  {
    id: "aws-cloud-practitioner",
    title: "AWS Cloud Practitioner",
    description: "Validate your overall understanding of AWS Cloud concepts, core services, security, architecture, pricing, and support.",
    logo: "/logos/aws.png",
    chapters: [
      "all",
      "cloud-concepts",
      "security-and-compliance"
    ]
  },
  {
    id: "azure-fundamentals",
    title: "Azure Fundamentals (AZ-900)",
    description: "Demonstrate foundational knowledge of cloud concepts, core Azure services, Azure management and governance.",
    logo: "/logos/azure.png",
    chapters: [
      "all",
      "cloud-concepts",
      "azure-services"
    ]
  },
  {
    id: "comptia-a-plus",
    title: "CompTIA A+",
    description: "Prove your competency in troubleshooting, networking, mobile devices, hardware, virtualization, and cloud computing.",
    logo: "/logos/comptia.png",
    chapters: [
      "all",
      "hardware",
      "networking"
    ]
  }
];
const awsChapters = /* @__PURE__ */ JSON.parse(`[{"id":"all","title":"All Chapters","questions":[{"id":"all-q1","text":"Which AWS service provides a fully managed relational database?","options":[{"id":"a","text":"Amazon S3"},{"id":"b","text":"Amazon RDS"},{"id":"c","text":"Amazon EC2"},{"id":"d","text":"AWS Lambda"}],"correctAnswer":"b","explanation":"Amazon RDS (Relational Database Service) is a fully managed service that makes it easy to set up, operate, and scale relational databases in the cloud."},{"id":"all-q2","text":"What is the AWS shared responsibility model?","options":[{"id":"a","text":"AWS is responsible for everything"},{"id":"b","text":"The customer is responsible for everything"},{"id":"c","text":"AWS manages security OF the cloud; customers manage security IN the cloud"},{"id":"d","text":"Security responsibilities are determined by the pricing tier"}],"correctAnswer":"c","explanation":"Under the shared responsibility model, AWS is responsible for protecting the infrastructure (hardware, software, networking) while customers are responsible for securing their data, applications, and configurations."},{"id":"all-q3","text":"Which pricing model allows you to pay for compute capacity by the hour or second with no long-term commitments?","options":[{"id":"a","text":"Reserved Instances"},{"id":"b","text":"Spot Instances"},{"id":"c","text":"On-Demand Instances"},{"id":"d","text":"Dedicated Hosts"}],"correctAnswer":"c","explanation":"On-Demand Instances let you pay for compute capacity by the hour or second with no long-term commitments or upfront payments."},{"id":"all-q4","text":"Which AWS service is used to deploy and manage containerized applications?","options":[{"id":"a","text":"Amazon ECS"},{"id":"b","text":"Amazon S3"},{"id":"c","text":"AWS CloudFormation"},{"id":"d","text":"Amazon Route 53"}],"correctAnswer":"a","explanation":"Amazon Elastic Container Service (ECS) is a fully managed container orchestration service used to deploy and manage containerized applications."},{"id":"all-q5","text":"What does the AWS Well-Architected Framework provide?","options":[{"id":"a","text":"Free AWS credits for startups"},{"id":"b","text":"A set of best practices and guidelines for building secure, high-performing, resilient cloud architectures"},{"id":"c","text":"Automatic code deployment pipelines"},{"id":"d","text":"Hardware provisioning templates"}],"correctAnswer":"b","explanation":"The AWS Well-Architected Framework provides best practices across six pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability."}]},{"id":"cloud-concepts","title":"Cloud Concepts","questions":[{"id":"cc-q1","text":"What is cloud computing?","options":[{"id":"a","text":"On-demand delivery of IT resources over the Internet with pay-as-you-go pricing"},{"id":"b","text":"Storing files on a local hard drive"},{"id":"c","text":"Running software only on physical servers in your office"},{"id":"d","text":"A type of programming language"}],"correctAnswer":"a","explanation":"Cloud computing is the on-demand delivery of IT resources over the Internet with pay-as-you-go pricing, eliminating the need to buy, own, and maintain physical data centers."},{"id":"cc-q2","text":"Which of the following is a benefit of cloud computing?","options":[{"id":"a","text":"Fixed monthly hardware costs"},{"id":"b","text":"Trade upfront expense for variable expense"},{"id":"c","text":"Decreased application performance"},{"id":"d","text":"Longer deployment times"}],"correctAnswer":"b","explanation":"One of the key benefits of cloud computing is trading upfront capital expenses (like buying servers) for variable operational expenses (pay only for what you use)."},{"id":"cc-q3","text":"What does 'elasticity' mean in cloud computing?","options":[{"id":"a","text":"The ability to physically stretch server hardware"},{"id":"b","text":"The ability to acquire resources as needed and release them when no longer required"},{"id":"c","text":"The speed of the internet connection"},{"id":"d","text":"The durability of stored data"}],"correctAnswer":"b","explanation":"Elasticity refers to the ability to automatically scale computing resources up or down based on demand, ensuring you only use and pay for what you need."},{"id":"cc-q4","text":"Which cloud deployment model runs applications entirely in the cloud?","options":[{"id":"a","text":"On-premises"},{"id":"b","text":"Hybrid"},{"id":"c","text":"Cloud-based (public cloud)"},{"id":"d","text":"Private cloud only"}],"correctAnswer":"c","explanation":"A cloud-based (public cloud) deployment runs all parts of the application in the cloud. Applications are either migrated to the cloud or designed and built directly in the cloud."},{"id":"cc-q5","text":"What is the difference between IaaS, PaaS, and SaaS?","options":[{"id":"a","text":"They are different programming languages"},{"id":"b","text":"They represent different levels of cloud service abstraction: infrastructure, platform, and software"},{"id":"c","text":"They are AWS-specific pricing tiers"},{"id":"d","text":"They are types of internet protocols"}],"correctAnswer":"b","explanation":"IaaS (Infrastructure as a Service) provides basic building blocks. PaaS (Platform as a Service) removes the need to manage infrastructure. SaaS (Software as a Service) provides a complete product run by the provider."}]},{"id":"security-and-compliance","title":"Security and Compliance","questions":[{"id":"sc-q1","text":"Which AWS service provides multi-factor authentication (MFA) for user accounts?","options":[{"id":"a","text":"Amazon GuardDuty"},{"id":"b","text":"AWS IAM"},{"id":"c","text":"Amazon CloudWatch"},{"id":"d","text":"AWS CloudTrail"}],"correctAnswer":"b","explanation":"AWS Identity and Access Management (IAM) supports MFA, adding an extra layer of security by requiring users to provide a second form of authentication beyond their password."},{"id":"sc-q2","text":"What is the principle of least privilege?","options":[{"id":"a","text":"Giving all users administrator access"},{"id":"b","text":"Granting only the minimum permissions needed to perform a task"},{"id":"c","text":"Using the cheapest AWS services available"},{"id":"d","text":"Reducing the number of AWS accounts"}],"correctAnswer":"b","explanation":"The principle of least privilege means granting users and systems only the permissions they need to complete their tasks, reducing the potential impact of security breaches."},{"id":"sc-q3","text":"Which AWS service automatically detects threats and monitors for malicious activity?","options":[{"id":"a","text":"AWS Config"},{"id":"b","text":"Amazon Inspector"},{"id":"c","text":"Amazon GuardDuty"},{"id":"d","text":"AWS Artifact"}],"correctAnswer":"c","explanation":"Amazon GuardDuty is a threat detection service that continuously monitors for malicious activity and unauthorized behavior using machine learning, anomaly detection, and integrated threat intelligence."},{"id":"sc-q4","text":"What does AWS CloudTrail do?","options":[{"id":"a","text":"Monitors application performance"},{"id":"b","text":"Records API calls and user activity across your AWS account"},{"id":"c","text":"Provides content delivery network services"},{"id":"d","text":"Manages DNS routing"}],"correctAnswer":"b","explanation":"AWS CloudTrail records API calls made on your account, providing a history of AWS API calls for auditing, compliance monitoring, and operational troubleshooting."},{"id":"sc-q5","text":"Which service helps you check whether your AWS environment follows security best practices?","options":[{"id":"a","text":"AWS Trusted Advisor"},{"id":"b","text":"Amazon EC2"},{"id":"c","text":"AWS Lambda"},{"id":"d","text":"Amazon S3"}],"correctAnswer":"a","explanation":"AWS Trusted Advisor inspects your AWS environment and provides recommendations across five categories: cost optimization, performance, security, fault tolerance, and service limits."}]}]`);
const azureChapters = /* @__PURE__ */ JSON.parse(`[{"id":"all","title":"All Chapters","questions":[{"id":"all-q1","text":"What is Azure Resource Manager (ARM)?","options":[{"id":"a","text":"A billing management tool"},{"id":"b","text":"The deployment and management service for Azure that provides a consistent management layer"},{"id":"c","text":"A virtual machine type"},{"id":"d","text":"A networking protocol"}],"correctAnswer":"b","explanation":"Azure Resource Manager is the deployment and management service for Azure. It provides a management layer that enables you to create, update, and delete resources in your Azure account."},{"id":"all-q2","text":"Which Azure service provides serverless compute capabilities?","options":[{"id":"a","text":"Azure Virtual Machines"},{"id":"b","text":"Azure Functions"},{"id":"c","text":"Azure Blob Storage"},{"id":"d","text":"Azure Virtual Network"}],"correctAnswer":"b","explanation":"Azure Functions is a serverless compute service that lets you run event-triggered code without having to provision or manage infrastructure."},{"id":"all-q3","text":"What is an Azure Availability Zone?","options":[{"id":"a","text":"A pricing tier for Azure services"},{"id":"b","text":"A unique physical location within an Azure region with independent power, cooling, and networking"},{"id":"c","text":"A type of Azure subscription"},{"id":"d","text":"A DNS management service"}],"correctAnswer":"b","explanation":"Azure Availability Zones are unique physical locations within an Azure region. Each zone is made up of one or more data centers with independent power, cooling, and networking."},{"id":"all-q4","text":"What does Azure Active Directory (Entra ID) provide?","options":[{"id":"a","text":"File storage services"},{"id":"b","text":"Identity and access management services"},{"id":"c","text":"Virtual machine hosting"},{"id":"d","text":"Content delivery network"}],"correctAnswer":"b","explanation":"Azure Active Directory (now Microsoft Entra ID) is a cloud-based identity and access management service that helps employees sign in and access resources."},{"id":"all-q5","text":"Which Azure service is used for building, deploying, and managing containerized applications?","options":[{"id":"a","text":"Azure Kubernetes Service (AKS)"},{"id":"b","text":"Azure Blob Storage"},{"id":"c","text":"Azure Logic Apps"},{"id":"d","text":"Azure Monitor"}],"correctAnswer":"a","explanation":"Azure Kubernetes Service (AKS) simplifies deploying and managing containerized applications by offloading the operational overhead to Azure."}]},{"id":"cloud-concepts","title":"Cloud Concepts","questions":[{"id":"cc-q1","text":"What does 'high availability' mean in cloud computing?","options":[{"id":"a","text":"Services are always free of charge"},{"id":"b","text":"Systems are designed to remain operational with minimal downtime"},{"id":"c","text":"Data is stored in a single location"},{"id":"d","text":"Applications run only during business hours"}],"correctAnswer":"b","explanation":"High availability refers to systems designed to remain operational and accessible with minimal downtime, typically achieved through redundancy and failover mechanisms."},{"id":"cc-q2","text":"What is the consumption-based model in cloud computing?","options":[{"id":"a","text":"Paying a fixed monthly fee regardless of usage"},{"id":"b","text":"Paying only for the resources you actually use"},{"id":"c","text":"Buying hardware upfront"},{"id":"d","text":"Free unlimited usage"}],"correctAnswer":"b","explanation":"The consumption-based model means you only pay for the cloud resources that you use, which helps reduce costs since you don't pay for unused capacity."},{"id":"cc-q3","text":"Which of the following is an example of PaaS (Platform as a Service)?","options":[{"id":"a","text":"Azure Virtual Machines"},{"id":"b","text":"Azure App Service"},{"id":"c","text":"Microsoft 365"},{"id":"d","text":"Azure Virtual Network"}],"correctAnswer":"b","explanation":"Azure App Service is a PaaS offering that allows developers to build, deploy, and scale web apps without managing the underlying infrastructure."},{"id":"cc-q4","text":"What is scalability in cloud computing?","options":[{"id":"a","text":"The ability to recover from failures"},{"id":"b","text":"The ability to increase or decrease resources to meet demand"},{"id":"c","text":"The speed of data transfer"},{"id":"d","text":"The geographic distribution of data centers"}],"correctAnswer":"b","explanation":"Scalability is the ability to adjust resources to meet demand. Vertical scaling adds more power to existing resources, while horizontal scaling adds more instances."},{"id":"cc-q5","text":"What is a Service Level Agreement (SLA)?","options":[{"id":"a","text":"A software license"},{"id":"b","text":"A formal agreement between a service provider and customer defining performance standards"},{"id":"c","text":"A type of Azure subscription"},{"id":"d","text":"A programming framework"}],"correctAnswer":"b","explanation":"An SLA is a formal agreement that defines performance targets and commitments a cloud provider makes to its customers, typically including uptime guarantees."}]},{"id":"azure-services","title":"Core Azure Services","questions":[{"id":"as-q1","text":"What is Azure Blob Storage used for?","options":[{"id":"a","text":"Running virtual machines"},{"id":"b","text":"Storing large amounts of unstructured data like text or binary data"},{"id":"c","text":"Managing DNS records"},{"id":"d","text":"Sending email notifications"}],"correctAnswer":"b","explanation":"Azure Blob Storage is optimized for storing massive amounts of unstructured data, such as text, binary data, images, and documents."},{"id":"as-q2","text":"Which Azure service provides a managed relational database?","options":[{"id":"a","text":"Azure Cosmos DB"},{"id":"b","text":"Azure SQL Database"},{"id":"c","text":"Azure Table Storage"},{"id":"d","text":"Azure Queue Storage"}],"correctAnswer":"b","explanation":"Azure SQL Database is a fully managed relational database service built on the latest stable version of the Microsoft SQL Server database engine."},{"id":"as-q3","text":"What does Azure Virtual Network (VNet) enable?","options":[{"id":"a","text":"Running serverless functions"},{"id":"b","text":"Secure communication between Azure resources, the internet, and on-premises networks"},{"id":"c","text":"Storing files in the cloud"},{"id":"d","text":"Monitoring application performance"}],"correctAnswer":"b","explanation":"Azure Virtual Network enables Azure resources to securely communicate with each other, the internet, and on-premises networks through an isolated and segmented network."},{"id":"as-q4","text":"What is Azure Cosmos DB?","options":[{"id":"a","text":"A relational database service"},{"id":"b","text":"A globally distributed, multi-model NoSQL database service"},{"id":"c","text":"A file storage service"},{"id":"d","text":"A compute service"}],"correctAnswer":"b","explanation":"Azure Cosmos DB is a globally distributed, multi-model database service designed for low-latency and highly responsive applications with support for multiple data models."},{"id":"as-q5","text":"Which Azure service helps distribute traffic across multiple servers?","options":[{"id":"a","text":"Azure Load Balancer"},{"id":"b","text":"Azure Key Vault"},{"id":"c","text":"Azure DevOps"},{"id":"d","text":"Azure Active Directory"}],"correctAnswer":"a","explanation":"Azure Load Balancer distributes incoming network traffic across multiple servers to ensure no single server bears too much load, improving availability and reliability."}]}]`);
const comptiaChapters = /* @__PURE__ */ JSON.parse(`[{"id":"all","title":"All Chapters","questions":[{"id":"all-q1","text":"What is the purpose of thermal paste in a computer?","options":[{"id":"a","text":"To glue the CPU to the motherboard"},{"id":"b","text":"To improve heat transfer between the CPU and the heat sink"},{"id":"c","text":"To increase RAM speed"},{"id":"d","text":"To protect against electrical surges"}],"correctAnswer":"b","explanation":"Thermal paste fills microscopic gaps between the CPU and heat sink surfaces, ensuring efficient heat transfer from the processor to the cooling solution."},{"id":"all-q2","text":"Which network device operates at Layer 3 of the OSI model?","options":[{"id":"a","text":"Hub"},{"id":"b","text":"Switch"},{"id":"c","text":"Router"},{"id":"d","text":"Repeater"}],"correctAnswer":"c","explanation":"Routers operate at Layer 3 (Network layer) of the OSI model. They use IP addresses to route packets between different networks."},{"id":"all-q3","text":"What is RAID 1?","options":[{"id":"a","text":"Disk striping without parity"},{"id":"b","text":"Disk mirroring for redundancy"},{"id":"c","text":"Disk striping with parity"},{"id":"d","text":"A combination of striping and mirroring"}],"correctAnswer":"b","explanation":"RAID 1 (mirroring) creates an exact copy of data on two or more drives. If one drive fails, the system continues operating from the mirror, providing redundancy."},{"id":"all-q4","text":"What does DHCP stand for and what does it do?","options":[{"id":"a","text":"Dynamic Host Configuration Protocol — automatically assigns IP addresses to devices"},{"id":"b","text":"Direct Hardware Control Protocol — manages hardware devices"},{"id":"c","text":"Data Handling and Communication Protocol — encrypts network data"},{"id":"d","text":"Distributed Host Computing Platform — manages cloud resources"}],"correctAnswer":"a","explanation":"DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses and other network configuration parameters to devices, eliminating the need for manual network configuration."},{"id":"all-q5","text":"What type of connector is commonly used for Ethernet networking?","options":[{"id":"a","text":"RJ-11"},{"id":"b","text":"RJ-45"},{"id":"c","text":"USB Type-C"},{"id":"d","text":"BNC"}],"correctAnswer":"b","explanation":"RJ-45 is the standard connector used for Ethernet networking cables (Cat5, Cat5e, Cat6, etc.). RJ-11 is used for telephone connections."}]},{"id":"hardware","title":"Hardware","questions":[{"id":"hw-q1","text":"What is the function of the motherboard in a computer?","options":[{"id":"a","text":"To store permanent data"},{"id":"b","text":"To serve as the main circuit board connecting all components"},{"id":"c","text":"To display graphics on the screen"},{"id":"d","text":"To cool the processor"}],"correctAnswer":"b","explanation":"The motherboard is the main circuit board that connects and allows communication between all computer components including CPU, RAM, storage, and expansion cards."},{"id":"hw-q2","text":"What is the difference between SSD and HDD?","options":[{"id":"a","text":"SSDs use spinning disks; HDDs use flash memory"},{"id":"b","text":"SSDs use flash memory with no moving parts; HDDs use spinning magnetic disks"},{"id":"c","text":"They are the same technology with different names"},{"id":"d","text":"SSDs are only used in servers; HDDs are for personal computers"}],"correctAnswer":"b","explanation":"SSDs (Solid State Drives) use NAND flash memory with no moving parts, offering faster read/write speeds. HDDs (Hard Disk Drives) use spinning magnetic platters and are generally cheaper per gigabyte."},{"id":"hw-q3","text":"What does RAM stand for and what is its purpose?","options":[{"id":"a","text":"Read Access Memory — stores data permanently"},{"id":"b","text":"Random Access Memory — provides temporary fast storage for active programs and data"},{"id":"c","text":"Rapid Application Manager — speeds up software installations"},{"id":"d","text":"Remote Access Module — enables network connections"}],"correctAnswer":"b","explanation":"RAM (Random Access Memory) is volatile memory that temporarily stores data and instructions for programs currently in use, allowing the CPU to access them quickly."},{"id":"hw-q4","text":"What is the purpose of a power supply unit (PSU)?","options":[{"id":"a","text":"To store electricity for later use"},{"id":"b","text":"To convert AC power from the wall outlet to DC power for computer components"},{"id":"c","text":"To regulate internet speed"},{"id":"d","text":"To control the display brightness"}],"correctAnswer":"b","explanation":"The PSU converts alternating current (AC) from the wall outlet into the various direct current (DC) voltages needed by the computer's internal components."},{"id":"hw-q5","text":"Which type of expansion slot is most commonly used for modern graphics cards?","options":[{"id":"a","text":"PCI"},{"id":"b","text":"AGP"},{"id":"c","text":"PCIe x16"},{"id":"d","text":"ISA"}],"correctAnswer":"c","explanation":"PCIe (PCI Express) x16 is the standard expansion slot used for modern graphics cards, providing high bandwidth needed for GPU communication with the CPU and RAM."}]},{"id":"networking","title":"Networking","questions":[{"id":"net-q1","text":"What is an IP address?","options":[{"id":"a","text":"A physical address printed on the network card"},{"id":"b","text":"A unique numerical label assigned to each device on a network"},{"id":"c","text":"A type of encryption protocol"},{"id":"d","text":"A brand of networking equipment"}],"correctAnswer":"b","explanation":"An IP (Internet Protocol) address is a unique numerical label assigned to each device connected to a computer network, used for identification and location addressing."},{"id":"net-q2","text":"What is the difference between TCP and UDP?","options":[{"id":"a","text":"TCP is wireless; UDP is wired"},{"id":"b","text":"TCP is connection-oriented and reliable; UDP is connectionless and faster but less reliable"},{"id":"c","text":"TCP is for email only; UDP is for web browsing only"},{"id":"d","text":"They are the same protocol with different versions"}],"correctAnswer":"b","explanation":"TCP (Transmission Control Protocol) establishes a connection and guarantees delivery with error checking. UDP (User Datagram Protocol) sends data without establishing a connection, trading reliability for speed."},{"id":"net-q3","text":"What is a subnet mask used for?","options":[{"id":"a","text":"To encrypt network traffic"},{"id":"b","text":"To determine which portion of an IP address refers to the network and which refers to the host"},{"id":"c","text":"To block unauthorized users"},{"id":"d","text":"To speed up internet connections"}],"correctAnswer":"b","explanation":"A subnet mask divides an IP address into the network portion and the host portion, helping devices determine whether a destination is on the local network or a remote one."},{"id":"net-q4","text":"What port number does HTTPS use by default?","options":[{"id":"a","text":"80"},{"id":"b","text":"21"},{"id":"c","text":"443"},{"id":"d","text":"25"}],"correctAnswer":"c","explanation":"HTTPS (HTTP Secure) uses port 443 by default. Regular HTTP uses port 80, FTP uses port 21, and SMTP uses port 25."},{"id":"net-q5","text":"What does DNS do?","options":[{"id":"a","text":"Encrypts all network traffic"},{"id":"b","text":"Translates domain names into IP addresses"},{"id":"c","text":"Assigns IP addresses automatically"},{"id":"d","text":"Monitors network performance"}],"correctAnswer":"b","explanation":"DNS (Domain Name System) translates human-readable domain names (like example.com) into IP addresses that computers use to identify each other on a network."}]}]`);
const chaptersMap = {
  "aws-cloud-practitioner": awsChapters,
  "azure-fundamentals": azureChapters,
  "comptia-a-plus": comptiaChapters
};
function getCertificates() {
  return certificatesData;
}
function getCertificateById(certId) {
  return certificatesData.find((cert) => cert.id === certId);
}
function getChapters(certId) {
  return chaptersMap[certId] ?? [];
}
function getChapterById(certId, chapterId) {
  const chapters = getChapters(certId);
  return chapters.find((ch) => ch.id === chapterId);
}
const $$splitComponentImporter$3 = () => import("./index-BGycfCyf.js");
const $$splitNotFoundComponentImporter$3 = () => import("./index-DKd-ycS6.js");
const Route$3 = createFileRoute("/certificates/$certId/")({
  loader: ({
    params
  }) => {
    const certificate = getCertificateById(params.certId);
    if (!certificate) {
      throw notFound();
    }
    const chapters = getChapters(params.certId);
    return {
      certificate,
      chapters
    };
  },
  head: ({
    loaderData
  }) => ({
    meta: seo({
      title: `${loaderData?.certificate.title ?? "Certificate"} — TestologyAI`,
      description: loaderData?.certificate.description ?? "",
      image: `${"/testologyAi/"}thumbnail.png`
    })
  }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$3, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./results-CWYh5STA.js");
const $$splitNotFoundComponentImporter$2 = () => import("./results-DI34Xb7M.js");
const Route$2 = createFileRoute("/certificates/$certId/chapters/$chapterId/results")({
  validateSearch: (search) => ({
    mode: search.mode || "exam"
  }),
  loader: ({
    params
  }) => {
    const certificate = getCertificateById(params.certId);
    if (!certificate) throw notFound();
    const chapter = getChapterById(params.certId, params.chapterId);
    if (!chapter) throw notFound();
    return {
      certificate,
      chapter
    };
  },
  head: ({
    loaderData
  }) => {
    const certTitle = loaderData?.certificate.title ?? "Certificate";
    const chTitle = loaderData?.chapter.title ?? "Results";
    return {
      meta: seo({
        title: `Results: ${chTitle} — ${certTitle} — TestologyAI`,
        description: `Results for ${chTitle} — ${certTitle}.`,
        image: `${"/testologyAi/"}thumbnail.png`
      })
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$2, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./practice-Bo-lG861.js");
const $$splitNotFoundComponentImporter$1 = () => import("./practice-DI34Xb7M.js");
const Route$1 = createFileRoute("/certificates/$certId/chapters/$chapterId/practice")({
  loader: ({
    params
  }) => {
    const certificate = getCertificateById(params.certId);
    if (!certificate) throw notFound();
    const chapter = getChapterById(params.certId, params.chapterId);
    if (!chapter) throw notFound();
    return {
      certificate,
      chapter
    };
  },
  head: ({
    loaderData
  }) => {
    const certTitle = loaderData?.certificate.title ?? "Certificate";
    const chTitle = loaderData?.chapter.title ?? "Practice";
    return {
      meta: seo({
        title: `Practice: ${chTitle} — ${certTitle} — TestologyAI`,
        description: `Practice ${chTitle} questions for ${certTitle}. Get instant feedback on every answer.`,
        image: `${"/testologyAi/"}thumbnail.png`
      })
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./exam-m0kL4wW9.js");
const $$splitNotFoundComponentImporter = () => import("./exam-DI34Xb7M.js");
const Route = createFileRoute("/certificates/$certId/chapters/$chapterId/exam")({
  loader: ({
    params
  }) => {
    const certificate = getCertificateById(params.certId);
    if (!certificate) throw notFound();
    const chapter = getChapterById(params.certId, params.chapterId);
    if (!chapter) throw notFound();
    return {
      certificate,
      chapter
    };
  },
  head: ({
    loaderData
  }) => {
    const certTitle = loaderData?.certificate.title ?? "Certificate";
    const chTitle = loaderData?.chapter.title ?? "Exam";
    return {
      meta: seo({
        title: `Exam: ${chTitle} — ${certTitle} — TestologyAI`,
        description: `Timed exam for ${chTitle} — ${certTitle}. 60-minute countdown with exam simulation.`,
        image: `${"/testologyAi/"}favicon-logo.png`
      })
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SplatRoute = Route$6.update({
  id: "/$",
  path: "/$",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const CertificatesIndexRoute = Route$4.update({
  id: "/certificates/",
  path: "/certificates/",
  getParentRoute: () => Route$7
});
const CertificatesCertIdIndexRoute = Route$3.update({
  id: "/certificates/$certId/",
  path: "/certificates/$certId/",
  getParentRoute: () => Route$7
});
const CertificatesCertIdChaptersChapterIdResultsRoute = Route$2.update({
  id: "/certificates/$certId/chapters/$chapterId/results",
  path: "/certificates/$certId/chapters/$chapterId/results",
  getParentRoute: () => Route$7
});
const CertificatesCertIdChaptersChapterIdPracticeRoute = Route$1.update({
  id: "/certificates/$certId/chapters/$chapterId/practice",
  path: "/certificates/$certId/chapters/$chapterId/practice",
  getParentRoute: () => Route$7
});
const CertificatesCertIdChaptersChapterIdExamRoute = Route.update({
  id: "/certificates/$certId/chapters/$chapterId/exam",
  path: "/certificates/$certId/chapters/$chapterId/exam",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  SplatRoute,
  CertificatesIndexRoute,
  CertificatesCertIdIndexRoute,
  CertificatesCertIdChaptersChapterIdExamRoute,
  CertificatesCertIdChaptersChapterIdPracticeRoute,
  CertificatesCertIdChaptersChapterIdResultsRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    basepath: "/testologyAi",
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  Route$3 as R,
  Route$2 as a,
  buttonVariants as b,
  cn as c,
  Route$1 as d,
  Route as e,
  getCertificates as g,
  router as r
};
