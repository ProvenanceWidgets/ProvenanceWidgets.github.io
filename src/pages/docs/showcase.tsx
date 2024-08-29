import Layout from "@theme/Layout"
import Heading from '@theme/Heading';
import Link from "@docusaurus/Link";
import styles from './showcase.module.css'
import clsx from "clsx";

const projects = [
    {
        title: 'Playground',
        description: 'A playground to test out all widgets available in the library.',
        link: 'playground'
    },
    {
        title: 'Scented Widgets',
        description: 'A showcase to replicate Scented Widgets for facilitating navigation in information spaces.',
        link: 'scented-widgets'
    },
    {
        title: 'Phosphor Objects',
        description: 'A showcase to replicate Phosphor objects in a web environment by limiting the provenance to the last two interactions.',
        link: 'phosphor-objects'
    },
    {
        title: 'Data Distribution',
        description: 'A showcase to visualize the data distribution of different attributes in a dataset using different widgets in the library.',
        link: 'data-distribution'
    },
    {
        title: 'Vega Integration',
        description: 'A showcase to demonstrate the integrability of ProvenanceWidgets with Vega signals.',
        link: 'vega-example'
    },
    {
        title: 'Dynamic Query Widgets',
        description: 'A showcase to replicate the dynamic query widgets for the homefinder application.',
        link: 'dynamic-query-widgets-homefinder'
    },
    {
        title: 'Widgets to Visualization Interaction',
        description: 'A showcase to demonstrate the use of ProvenanceWidgets to interact with a visualization.',
        link: 'widgets-to-vis-one-way'
    },
    {
        title: 'Visualization to Widgets Interaction',
        description: 'A showcase to demonstrate how the widgets can be updated by interacting with a visualization.',
        link: 'vis-to-widgets-one-way'
    }
]

const title = 'Showcase'
const description = 'Demonstrations of the ProvenanceWidgets library in action.'

export default function Showcase() {
    return (
        <Layout {...{ title, description }} wrapperClassName={styles.layout}>
            <div className="container padding-top--md padding-bottom--lg">
                <Heading as="h1" className="hero__title">
                    {title}
                </Heading>
                <p className="hero__subtitle">{description}</p>
                <div className="grid">
                    {projects.map((project, i) => (
                        <div className="col-12 md:col-6 lg:col-3" key={i}>
                            <Link 
                                className={clsx('card h-full', styles.linkReset)}
                                to={`https://provenancewidgets.github.io/showcase/#/${project.link}`}
                            >
                                <div className="card__image">
                                    <img src={`/img/${project.link}.png`} alt={project.title} />
                                </div>
                                <div className="card__body">
                                    <h4 className={styles.titleOverride}>{project.title}</h4>
                                    <small className={styles.paragraphReset}>{project.description}</small>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}