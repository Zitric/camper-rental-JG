import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Content, { HTMLContent } from '../components/Content';
import Layout from '../components/Layout';
import Hero from '../components/Hero';

export const ConditionPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ConditionPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const ConditionPage = ({ data }) => {
  const { markdownRemark, heroImage } = data;

  return (
    <Layout>
      {heroImage && <Hero heading={'Quienes somos'} image={heroImage} />}
      <ConditionPageTemplate
        contentComponent={HTMLContent}
        title={markdownRemark.frontmatter.title}
        content={markdownRemark.html}
      />
    </Layout>
  );
};

ConditionPage.propTypes = {
  data: PropTypes.object,
  image: PropTypes.objectOf(),
};

export default ConditionPage;

export const conditionPageQuery = graphql`
  query ConditionPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
    heroImage: file(relativePath: { eq: "conditions.jpg" }) {
      sharp: childImageSharp {
        fluid(maxWidth: 2048, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
