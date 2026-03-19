import React from 'react';
import { Helmet } from 'react-helmet-async';
import { seoConfig } from '../config/seo';

const toAbsoluteUrl = (path = '/') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${seoConfig.baseUrl}${normalizedPath === '/' ? '/' : normalizedPath}`;
};

const SEOHead = ({
  title = seoConfig.defaultTitle,
  description = seoConfig.defaultDescription,
  keywords = seoConfig.keywords,
  image = seoConfig.image,
  url = '/',
  type = 'website',
  structuredData
}) => {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : url;
  const canonicalUrl = toAbsoluteUrl(url === '/' ? currentPath : url);
  const keywordContent = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  const currentYear = new Date().getFullYear();

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${seoConfig.baseUrl}/#person`,
    name: seoConfig.name,
    url: seoConfig.baseUrl,
    image,
    jobTitle: seoConfig.jobTitle,
    email: seoConfig.email,
    sameAs: Object.values(seoConfig.social),
    knowsAbout: seoConfig.keywords,
    homeLocation: {
      '@type': 'Place',
      name: `${seoConfig.location.city}, ${seoConfig.location.region}, ${seoConfig.location.country}`
    }
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${seoConfig.baseUrl}/#website`,
    url: seoConfig.baseUrl,
    name: seoConfig.siteName,
    description,
    publisher: {
      '@id': `${seoConfig.baseUrl}/#person`
    },
    inLanguage: seoConfig.language
  };

  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description,
    isPartOf: {
      '@id': `${seoConfig.baseUrl}/#website`
    },
    about: {
      '@id': `${seoConfig.baseUrl}/#person`
    },
    inLanguage: seoConfig.language
  };

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Portfolio Projects',
    itemListElement: seoConfig.projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.name,
        description: project.description,
        url: project.url || project.codeUrl,
        creator: {
          '@id': `${seoConfig.baseUrl}/#person`
        },
        keywords: project.tech.join(', ')
      }
    }))
  };

  const additionalSchema = Array.isArray(structuredData)
    ? structuredData
    : structuredData
      ? [structuredData]
      : [];

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en-US" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordContent} />
      <meta name="author" content={seoConfig.name} />
      <meta name="creator" content={seoConfig.name} />
      <meta name="publisher" content={seoConfig.name} />
      <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <meta name="googlebot" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <meta name="theme-color" content="#000000" />
      <meta name="format-detection" content="telephone=no" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={seoConfig.baseUrl} />
      <link rel="alternate" hrefLang="x-default" href={seoConfig.baseUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@visheshpanchal" />

      <meta name="application-name" content={seoConfig.siteName} />
      <meta name="apple-mobile-web-app-title" content={seoConfig.name} />
      <meta name="copyright" content={`Copyright ${currentYear} ${seoConfig.name}`} />

      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(webpageSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(projectSchema)}</script>
      {additionalSchema.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
