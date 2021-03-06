import { graphql, useStaticQuery } from 'gatsby';

const useCamperVanPosts = () => {
  const posts = useStaticQuery(graphql`
    query CamperVanRollQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "camper-van-post" } } }
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            fields {
              slug
            }
            frontmatter {
              title
              name
              description
              equipment
              templateKey
              avatar
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    }
  `);

  const edges = posts.allMarkdownRemark.edges;

  return edges.map((post) => ({
    id: post.node.id,
    templateKey: post.node.frontmatter.templateKey,
    title: post.node.frontmatter.title,
    name: post.node.frontmatter.name,
    date: post.node.frontmatter.date,
    slug: post.node.fields.slug,
    excerpt: post.node.excerpt,
    avatar: post.node.frontmatter.avatar,
    images: post.node.frontmatter.images,
  }));
};

export default useCamperVanPosts;
