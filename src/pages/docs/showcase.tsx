import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import clsx from "clsx";
import React from "react";

import styles from "./showcase.module.css";

type Project = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  route: string;
};

// Add the deployed SuperProvenanceWidgets showcase base URL here when it is ready.
// Example: "https://provenancewidgets.github.io/super-showcase/#"
const swShowcaseBaseUrl: string = "";

const projects: Project[] = [
  {
    title: "Playground",
    description:
      "A playground to test SuperProvenanceWidgets across all available UI controls.",
    image: "/img/playground.png?v=sw",
    imageAlt: "SuperProvenanceWidgets playground",
    route: "/playground",
  },
  {
    title: "Scented Widgets",
    description:
      "A SuperProvenanceWidgets showcase based on Scented Widgets for navigating information spaces.",
    image: "/img/scented-widgets.png?v=sw",
    imageAlt: "SuperProvenanceWidgets Scented Widgets showcase",
    route: "/scented-widgets",
  },
  {
    title: "Phosphor Objects",
    description:
      "A SuperProvenanceWidgets showcase based on Phosphor objects and recent interaction history.",
    image: "/img/phosphor-objects.png?v=sw",
    imageAlt: "SuperProvenanceWidgets Phosphor Objects showcase",
    route: "/phosphor-objects",
  },
  {
    title: "Data Distribution",
    description:
      "A showcase of cross-control provenance while exploring data distributions.",
    image: "/img/data-distribution.png?v=sw",
    imageAlt: "SuperProvenanceWidgets Data Distribution showcase",
    route: "/data-distribution",
  },
  {
    title: "Vega Integration",
    description:
      "A showcase demonstrating SuperProvenanceWidgets with Vega signals.",
    image: "/img/vega-example.png?v=sw",
    imageAlt: "SuperProvenanceWidgets Vega Integration showcase",
    route: "/vega-example",
  },
  {
    title: "Dynamic Query Widgets",
    description:
      "A showcase of cross-control provenance in the HomeFinder dynamic query interface.",
    image: "/img/dynamic-query-widgets-homefinder.png?v=sw",
    imageAlt: "SuperProvenanceWidgets Dynamic Query Widgets showcase",
    route: "/dynamic-query-widgets-homefinder",
  },
  {
    title: "Widgets to Visualization one-way",
    description:
      "A showcase tracking interactions that flow from UI controls to a visualization.",
    image: "/img/widgets-to-vis-one-way.png?v=sw",
    imageAlt: "SuperProvenanceWidgets Widgets to Visualization showcase",
    route: "/widgets-to-vis-one-way",
  },
  {
    title: "Visualization to Widgets one-way",
    description:
      "A showcase tracking updates that flow from a visualization to UI controls.",
    image: "/img/vis-to-widgets-one-way.png?v=sw",
    imageAlt: "SuperProvenanceWidgets Visualization to Widgets showcase",
    route: "/vis-to-widgets-one-way",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const href = swShowcaseBaseUrl
    ? `${swShowcaseBaseUrl.replace(/\/$/, "")}${project.route}`
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

export default function Showcase(): JSX.Element {
  const description =
    "Demonstrations of the SuperProvenanceWidgets library in action.";

  return (
    <Layout
      title="Showcase"
      description={description}
      wrapperClassName={styles.layout}
    >
      <main className="container padding-top--lg padding-bottom--lg">
        <header className={styles.pageHeader}>
          <Heading as="h1" className="hero__title">
            Showcase
          </Heading>
          <p className="hero__subtitle">{description}</p>
        </header>

        <div className="grid">
          {projects.map(project => (
            <div className="col col--3 margin-bottom--lg" key={project.title}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
