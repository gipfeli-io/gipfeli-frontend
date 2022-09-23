import { Container, Link as MuiLink } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import Addresses from '../shared/Addresses'
import ResponsiblePersons from '../shared/ResponsiblePersons'

const Imprint = () => {
  return (
    <Container maxWidth={'lg'}>
      <Typography variant="h2" gutterBottom component="h1" sx={{ mt: 2 }}>
        Imprint
      </Typography>
      <Typography variant="h4" gutterBottom component="h2" sx={{ mt: 2 }}>
        Contact Addresses
      </Typography>
      <Addresses/>
      <Typography variant="h4" gutterBottom component="h2" sx={{ mt: 2 }}>
        Authorized Representatives
      </Typography>
      <ResponsiblePersons/>
      <Typography variant="h4" gutterBottom component="h2" sx={{ mt: 2 }}>
        Disclaimer
      </Typography>
      <Typography variant="body1" gutterBottom component="div" sx={{ mt: 2 }}>
        <p>All information on our website has been carefully checked. We make every effort to ensure that the
          information we provide is up-to-date, correct and complete.
          Nevertheless, the occurrence of errors can not be completely excluded, so we can not guarantee the
          completeness, accuracy and timeliness of information,
          including journalistic-editorial nature. Liability claims regarding damage caused by the use of any
          information provided, including any kind of information which is
          incomplete or incorrect, will therefore be rejected.
          The publisher may change or delete texts at his own discretion and without notice and is not obliged to update
          the contents of this website. The use of or access to
          this website is at the visitor&#39;s own risk. The publisher, its clients or partners are not responsible for
          damages, such as direct, indirect, incidental, consequential or
          punitive damages, allegedly caused by the visit of this website and consequently assume no liability for such
          damages.
          The publisher also accepts no responsibility or liability for the content and availability of third-party
          websites that can be accessed via external links on this website.
          The operators of the linked sites are solely responsible for their content. The publisher thus expressly
          distances itself from all third-party content that may be relevant
          under criminal or liability law or that may offend common decency.</p>

        <p>The author reserves the right not to be responsible for the topicality, correctness, completeness or quality
          of
          the information provided. Liability claims regarding damage caused by the use of any information provided,
          including any kind of information which is incomplete or incorrect, will therefore be rejected. All offers are
          non-binding. Parts of the pages or the complete publication including all offers and information might be
          extended, changed or partly or completely deleted by the author without separate announcement.</p>
      </Typography>
      <Typography variant="h4" gutterBottom component="h2" sx={{ mt: 2 }}>
        Liability for Links
      </Typography>
      <Typography variant="body1" gutterBottom component="div" sx={{ mt: 2 }}>
        References and links to third party websites are outside our responsibility. We disclaim any responsibility for
        such websites. Access and use of such websites is at the user&apos;s own risk.
      </Typography>
      <Typography variant="h4" gutterBottom component="h2" sx={{ mt: 2 }}>
        Copyrights
      </Typography>
      <Typography variant="body1" gutterBottom component="div" sx={{ mt: 2 }}>
        The copyright and all other rights to the content, images, photos or other files on the website belong
        exclusively to the company Gipfeli.io or to the specifically named rights holders. For the reproduction of any
        elements, the written consent of the copyright holders must be obtained in advance.
        <p>
          Icons used on this page are all free and provided by:
        </p>
        <ul>
          <li><a target="_blank" href="https://fonts.google.com/icons?selected=Material+Icons&icon.platform=android"
                 rel="noreferrer">Google Fonts - Material Icons</a></li>
          <li><a target="_blank" href="https://undraw.co/" rel="noreferrer">unDraw</a></li>
          <li><a target="_blank" href="https://www.svgrepo.com" rel="noreferrer">SVG Repo</a> (we only use Icons
            licensed under the CC0 License)
          </li>
        </ul>
      </Typography>
      <Typography variant="h4" gutterBottom component="h2" sx={{ mt: 2 }}>
        Privacy Policy
      </Typography>
      <Typography variant="body1" gutterBottom component="div" sx={{ mt: 2 }}>
        Based on Article 13 of the Swiss Federal Constitution and the data protection provisions of the Swiss
        Confederation (Data Protection Act, DSG),
        every person has the right to protection of their privacy as well as protection against misuse of their personal
        data.
        The operators of these pages take the protection of your personal data very seriously. We treat your personal
        data confidentially and in accordance
        with the legal data protection regulations as well as this privacy policy.
        In cooperation with our hosting providers, we make every effort to protect the databases as well as possible
        against unauthorized access,
        loss, misuse or falsification. We would like to point out that data transmission on the Internet (e.g.
        communication by e-mail) can have security gaps.
        A complete protection of data against access by third parties is not possible. By using this website, you
        consent to the collection, processing and use
        of data in accordance with the following description. This website can generally be visited without
        registration. Data such as pages accessed or
        names of files accessed, date and time are stored on the server for statistical purposes without this data being
        directly related to your person.
        Personal data, in particular name, address or e-mail address are collected as far as possible on a voluntary
        basis. Without your consent, the data
        will not be passed on to third parties.
        <Typography
          sx={{ pt: 2 }}
          variant="subtitle1"
          color="text.secondary"
          component="p"
          gutterBottom
        >
          <MuiLink component={Link} to={'/privacy-policy'} color={'inherit'}>Privacy Policy</MuiLink>
        </Typography>
      </Typography>
    </Container>
  )
}

export default Imprint
