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

const showcaseBaseUrl = "https://provenancewidgets.github.io/showcase/#";

const projects: Project[] = [
  {
    title: "Playground",
    description:
      "A playground to test SuperProvenanceWidgets across all available UI controls.",
    image: "/img/showcase/v2/playground.png",
    imageAlt: "SuperProvenanceWidgets playground",
    route: "/playground",
  },
  {
    title: "Scented Widgets",
    description:
      "A SuperProvenanceWidgets showcase based on Scented Widgets for navigating information spaces.",
    image: "/img/showcase/v2/scented-widgets.png",
    imageAlt: "SuperProvenanceWidgets Scented Widgets showcase",
    route: "/scented-widgets",
  },
  {
    title: "Phosphor Objects",
    description:
      "A SuperProvenanceWidgets showcase based on Phosphor objects and recent interaction history.",
    image: "/img/showcase/v2/phosphor-objects.png",
    imageAlt: "SuperProvenanceWidgets Phosphor Objects showcase",
    route: "/phosphor-objects",
  },
  {
    title: "Data Distribution",
    description:
      "A showcase of cross-control provenance while exploring data distributions.",
    image: "/img/showcase/v2/data-distribution.png",
    imageAlt: "SuperProvenanceWidgets Data Distribution showcase",
    route: "/data-distribution",
  },
  {
    title: "Vega Integration",
    description:
      "A showcase demonstrating SuperProvenanceWidgets with Vega signals.",
    image: "/img/showcase/v2/vega-example.png",
    imageAlt: "SuperProvenanceWidgets Vega Integration showcase",
    route: "/vega-example",
  },
  {
    title: "Dynamic Query Widgets",
    description:
      "A showcase of cross-control provenance in the HomeFinder dynamic query interface.",
    image: "/img/showcase/v2/dynamic-query-widgets-homefinder.png",
    imageAlt: "SuperProvenanceWidgets Dynamic Query Widgets showcase",
    route: "/dynamic-query-widgets-homefinder",
  },
  {
    title: "Widgets to Visualization one-way",
    description:
      "A showcase tracking interactions that flow from UI controls to a visualization.",
    image: "/img/showcase/v2/widgets-to-vis-one-way.png",
    imageAlt: "SuperProvenanceWidgets Widgets to Visualization showcase",
    route: "/widgets-to-vis-one-way",
  },
  {
    title: "Visualization to Widgets one-way",
    description:
      "A showcase tracking updates that flow from a visualization to UI controls.",
    image: "/img/showcase/v2/vis-to-widgets-one-way.png",
    imageAlt: "SuperProvenanceWidgets Visualization to Widgets showcase",
    route: "/vis-to-widgets-one-way",
  },
];

const description = "See the library in action.";

function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const href = `${showcaseBaseUrl}${project.route}`;
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
        </div>
        <p className={styles.paragraphReset}>{project.description}</p>
      </div>
    </>
  );

  return (
    <Link
      className={clsx("card h-full", styles.linkReset)}
      to={href}
    >
      {content}
    </Link>
  );
}

export function ShowcasePage(): JSX.Element {
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

