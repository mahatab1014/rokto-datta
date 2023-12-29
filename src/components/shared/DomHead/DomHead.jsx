import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const DomHead = ({
  title,
  metaDescription,
  metaImageURL,
  metaPageURL,
  metaKeywords,
  metaAuthorName,
}) => {
  return (
    <>
      <Helmet>
        <title>{`${title} | রক্তদাতা`}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImageURL} />
        <meta property="og:url" content={metaPageURL} />

        <meta name="keywords" content={metaKeywords} />
        <meta name="author" content={metaAuthorName} />
        <meta name="robots" content="index, follow" />
      </Helmet>
    </>
  );
};

export default DomHead;

DomHead.propTypes = {
  title: PropTypes.string,
  metaDescription: PropTypes.string,
  metaImageURL: PropTypes.string,
  metaPageURL: PropTypes.string,
  metaKeywords: PropTypes.string,
  metaAuthorName: PropTypes.string,
};
