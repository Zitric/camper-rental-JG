import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Collapse } from 'antd';
import { v4 } from 'uuid';

import { CaretRightOutlined } from '@ant-design/icons';
import Content, { HTMLContent } from '../components/Content';
import Layout from '../components/Layout';
import Hero from '../components/Hero';

const { Panel } = Collapse;

export const FAQPageTemplate = ({
  heading,
  content,
  contentComponent,
  questions,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section section--gradient grid">
      <div className="columns">
        <div className="column">
          <h1 className="title is-size-3 has-text-weight-bold is-bold-light heading-page">
            {heading}
          </h1>
          {/* <PageContent className="content" content={content} /> */}
          <Collapse
            className="card"
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
          >
            {questions &&
              questions.map((question) => (
                <Panel header={question.question} key={v4()}>
                  <p>{question.answer}</p>
                </Panel>
              ))}
          </Collapse>
        </div>
      </div>
    </section>
  );
};

FAQPageTemplate.propTypes = {
  heading: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const FAQPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark;

  return (
    <Layout>
      {frontmatter.heroImage && (
        <Hero image={frontmatter.heroImage} heading={frontmatter.heading} />
      )}
      <FAQPageTemplate
        contentComponent={HTMLContent}
        content={html}
        title={frontmatter.title}
        heading={frontmatter.heading}
        questions={frontmatter.questions}
      />
    </Layout>
  );
};

FAQPage.propTypes = {
  data: PropTypes.object,
};

FAQPage.defaultProps = {
  data: null,
};

export default FAQPage;

export const FAQPageQuery = graphql`
  query FAQPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heroImage {
          sharp: childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        heading
        questions {
          question
          answer
        }
      }
    }
  }
`;
