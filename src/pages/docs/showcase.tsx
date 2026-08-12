import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import clsx from "clsx";
import React from "react";

import styles from "./showcase.module.css";

type ShowcaseVersion = "2.0" | "1.0";

type Project = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  route: string;
};

const swShowcaseBaseUrl: string = "";
const pwShowcaseBaseUrl = "https://provenancewidgets.github.io/showcase/#";

const swProjects: Project[] = [
  {
    title: "Playground",
    description:
      "A playground to test SuperProvenanceWidgets across all available UI controls.",
    image: "/img/showcase/sw/playground.png",
    imageAlt: "SuperProvenanceWidgets playground",
    route: "/playground",
  },
  {
    title: "Scented Widgets",
    description:
      "A SuperProvenanceWidgets showcase based on Scented Widgets for navigating information spaces.",
    image: "/img/showcase/sw/scented-widgets.png",
    imageAlt: "SuperProvenanceWidgets Scented Widgets showcase",
    route: "/scented-widgets",
  },
  {
    title: "Phosphor Objects",
    description:
      "A SuperProvenanceWidgets showcase based on Phosphor objects and recent interaction history.",
    image: "/img/showcase/sw/phosphor-objects.png",
    imageAlt: "SuperProvenanceWidgets Phosphor Objects showcase",
    route: "/phosphor-objects",
  },
  {
    title: "Data Distribution",
    description:
      "A showcase of cross-control provenance while exploring data distributions.",
    image: "/img/showcase/sw/data-distribution.png",
    imageAlt: "SuperProvenanceWidgets Data Distribution showcase",
    route: "/data-distribution",
  },
  {
    title: "Vega Integration",
    description:
      "A showcase demonstrating SuperProvenanceWidgets with Vega signals.",
    image: "/img/showcase/sw/vega-example.png",
    imageAlt: "SuperProvenanceWidgets Vega Integration showcase",
    route: "/vega-example",
  },
  {
    title: "Dynamic Query Widgets",
    description:
      "A showcase of cross-control provenance in the HomeFinder dynamic query interface.",
    image: "/img/showcase/sw/dynamic-query-widgets-homefinder.png",
    imageAlt: "SuperProvenanceWidgets Dynamic Query Widgets showcase",
    route: "/dynamic-query-widgets-homefinder",
  },
  {
    title: "Widgets to Visualization one-way",
    description:
      "A showcase tracking interactions that flow from UI controls to a visualization.",
    image: "/img/showcase/sw/widgets-to-vis-one-way.png",
    imageAlt: "SuperProvenanceWidgets Widgets to Visualization showcase",
    route: "/widgets-to-vis-one-way",
  },
  {
    title: "Visualization to Widgets one-way",
    description:
      "A showcase tracking updates that flow from a visualization to UI controls.",
    image: "/img/showcase/sw/vis-to-widgets-one-way.png",
    imageAlt: "SuperProvenanceWidgets Visualization to Widgets showcase",
    route: "/vis-to-widgets-one-way",
  },
];

const pwProjects: Project[] = [
  {
    title: "Playground",
    description: "A playground to test out all widgets available in the library.",
    image: "/img/playground.png",
    imageAlt: "ProvenanceWidgets playground",
    route: "/playground",
  },
  {
    title: "Scented Widgets",
    description:
      "A showcase replicating Scented Widgets for facilitating navigation in information spaces.",
    image: "/img/scented-widgets.png",
    imageAlt: "ProvenanceWidgets Scented Widgets showcase",
    route: "/scented-widgets",
  },
  {
    title: "Phosphor Objects",
    description:
      "A showcase replicating Phosphor objects by limiting provenance to the last two interactions.",
    image: "/img/phosphor-objects.png",
    imageAlt: "ProvenanceWidgets Phosphor Objects showcase",
    route: "/phosphor-objects",
  },
  {
    title: "Data Distribution",
    description:
      "A showcase visualizing attribute distributions using different widgets in the library.",
    image: "/img/data-distribution.png",
    imageAlt: "ProvenanceWidgets Data Distribution showcase",
    route: "/data-distribution",
  },
  {
    title: "Vega Integration",
    description:
      "A showcase demonstrating the integration of ProvenanceWidgets with Vega signals.",
    image: "/img/vega-example.png",
    imageAlt: "ProvenanceWidgets Vega Integration showcase",
    route: "/vega-example",
  },
  {
    title: "Dynamic Query Widgets",
    description:
      "A showcase replicating dynamic query widgets for the HomeFinder application.",
    image: "/img/dynamic-query-widgets-homefinder.png",
    imageAlt: "ProvenanceWidgets Dynamic Query Widgets showcase",
    route: "/dynamic-query-widgets-homefinder",
  },
  {
    title: "Widgets to Visualization one-way",
    description:
      "A showcase using ProvenanceWidgets to interact with a visualization.",
    image: "/img/widgets-to-vis-one-way.png",
    imageAlt: "ProvenanceWidgets Widgets to Visualization showcase",
    route: "/widgets-to-vis-one-way",
  },
  {
    title: "Visualization to Widgets one-way",
    description:
      "A showcase updating widgets through interactions with a visualization.",
    image: "/img/vis-to-widgets-one-way.png",
    imageAlt: "ProvenanceWidgets Visualization to Widgets showcase",
    route: "/vis-to-widgets-one-way",
  },
];

const showcases = {
  "2.0": {
    description:
      "Demonstrations of the SuperProvenanceWidgets library in action.",
    baseUrl: swShowcaseBaseUrl,
    projects: swProjects,
  },
  "1.0": {
    description: "Demonstrations of the ProvenanceWidgets library in action.",
    baseUrl: pwShowcaseBaseUrl,
    projects: pwProjects,
  },
} satisfies Record<
  ShowcaseVersion,
  { description: string; baseUrl: string; projects: Project[] }
>;

function ProjectCard({
  project,
  baseUrl,
}: {
  project: Project;
  baseUrl: string;
}) {
  const href = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}${project.route}`
    : undefined;
  const content = (
    <>
      <div className="card__image">
        <img src={project.image} alt={project.imageAlt} />
      </div>
      <div className="card__body">
        <div className={styles.cardHeading}>
          <Heading as="h3" className={styles.titleOverride}>
            {project.title}
          </Heading>
          {!href && <span className={styles.status}>Coming soon</span>}
        </div>
        <p className={styles.paragraphReset}>{project.description}</p>
      </div>
    </>
  );

  if (!href) {
    return (
      <article className={clsx("card h-full", styles.pendingCard)}>
        {content}
      </article>
    );
  }

  return (
    <Link
      className={clsx("card h-full", styles.linkReset)}
      to={href}
    >
      {content}
    </Link>
  );
}

export function ShowcasePage({
  version,
}: {
  version: ShowcaseVersion;
}): JSX.Element {
  const activeShowcase = showcases[version];

  return (
    <Layout
      title={`Showcase ${version}`}
      description={activeShowcase.description}
      wrapperClassName={styles.layout}
    >
      <main className="container padding-top--lg padding-bottom--lg">
        <header className={styles.pageHeader}>
          <Heading as="h1" className="hero__title">
            Showcase
          </Heading>
          <p className="hero__subtitle">{activeShowcase.description}</p>
        </header>

        <div className="grid">
          {activeShowcase.projects.map(project => (
            <div className="col col--3 margin-bottom--lg" key={project.title}>
              <ProjectCard project={project} baseUrl={activeShowcase.baseUrl} />
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}

export default function LegacyShowcase(): JSX.Element {
  return <ShowcasePage version="2.0" />;
}
