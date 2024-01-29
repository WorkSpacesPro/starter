interface Project {
  title: string;
  description: string;
  href?: string;
  imgSrc?: string;
}

const projectsData: Project[] = [
  {
    title: 'Bubbly Clouds',
    description: `Bubbly Clouds is James Acres' sole trader business identity. It is the parent brand of upcoming projects. Between October 2013 and September 2021 it operated as a web hosting, SSL and domains business. This business stopped operating due to rising costs from cPanel and WHMCS partners and a decline in clients following the 2020 pandemic. I provided various local businesses across the South of England with PHP, Node.js, Python, Perl and more with the industry leading cPanel and WHM all of which I managed at Linode. I provided personal technical support across a wide range of web, email, networking and sysadmin issues, plus of course the usual business as usual.`,
    imgSrc: '/content/images/projects/bubbly-clouds-invert.png',
    href: 'https://bubblyclouds.com',
  },
  {
    title: 'Music Rating',
    description: `A website hosting music ratings for Stephen Esch. Version one is using Node.js, Knex+Postgres, S3, AngularJS. Soon to be rewritten in React, Next.js and a NestJS REST API.`,
    imgSrc: '/content/images/projects/music-rating.png',
    href: 'https://music.stephenesch.co.uk/',
  },
  {
    title: 'Eurovisionr',
    description: `Now offline, a collaboration with Jade Elliott, a fun, simple and interactive way to pick the song you want to support at the current year's Eurovision Song Contest.

    eurovisionr started in 2013 with category filters and has just been relaunched for 2014 with new ranking features.
    
    The AngularJS frontend requested data from a Node.js powered backend API which connected to a MongoDB database and returned JSON.`,
  },
  {
    title: 'Geolert Location Based Mobile Coupons',
    description: `Final year project at University of Southampton. In this project a location-based coupon application is designed, implemented,
    tested and evaluated. Merchants add coupons into the website application which are then pushed to consumer Android devices as they enter merchant brick and mortar places using geofences.`,
  },
];

export default projectsData;
