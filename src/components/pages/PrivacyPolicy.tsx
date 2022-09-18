import { Container } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography'
import Addresses from '../shared/Addresses'
import ResponsiblePersons from '../shared/ResponsiblePersons'

const PrivacyPolicy = () => {
  return (
    <Container maxWidth={'lg'}>
      <Typography variant="h2" gutterBottom component="h1" sx={{ mt: 2 }}>
        Privacy Policy
      </Typography>
      <Typography variant="h4" gutterBottom component="h2" sx={{ mt: 2 }}>
        Responsible entities
      </Typography>
      <Addresses/>
      <Typography variant="h4" gutterBottom component="h2" sx={{ mt: 2 }}>
        Data protection officers
      </Typography>
      <ResponsiblePersons/>
      <Typography variant="h4" gutterBottom component="h2" sx={{ mt: 2 }}>
        Processing of personal data
      </Typography>
      <Typography variant="body1" gutterBottom component="div" sx={{ mt: 2 }}>
        <p>
        Personal data is any information that relates to an identified or identifiable person. A data subject is a person about whom personal data is processed.
        Processing includes any handling of personal data, regardless of the means and procedures used, in particular the storage, disclosure, acquisition, deletion, storage,
        modification, destruction and use of personal data.
        </p>
        <p>
        We process personal data in accordance with Swiss data protection law. Furthermore, to the extent and insofar as the EU GDPR is applicable, we process personal data
        in accordance with the following legal bases in connection with Art. 6 (1) GDPR:</p>
        <ul>
            <li>lit. a) Processing of personal data with the consent of the data subject.</li>
            <li>lit. b) Processing of personal data for the fulfillment of a contract with the data subject as well as for the implementation of corresponding pre-contractual measures.</li>
            <li>lit. c) Processing of personal data for the fulfillment of a legal obligation to which we are subject under any applicable law of the EU or under any applicable law of a
            country in which the GDPR is applicable in whole or in part.</li>
            <li>lit. d) Processing of personal data in order to protect the vital interests of the data subject or another natural person.</li>
            <li>lit. f) Processing of personal data to protect the legitimate interests of us or of third parties, unless the fundamental freedoms and rights and interests of the data
            subject are overridden. Legitimate interests include, in particular, our business interest in being able to provide our website, information security, the enforcement of
                      our own legal claims and compliance with Swiss law.</li>
          </ul>
        <p>
        We process personal data for the duration required for the respective purpose or purposes. In the case of longer-term retention obligations due to legal and other
        obligations to which we are subject, we restrict processing accordingly.
        </p>
      </Typography>
      <Typography variant="h4" gutterBottom component="h2" sx={{ mt: 2 }}>
        With SSL/TLS encryption
      </Typography>
      <Typography variant="body1" gutterBottom component="div" sx={{ mt: 2 }}>
       <p> This website uses SSL/TLS encryption for security reasons and to protect the transmission of confidential content, such as requests
        that you send to us as the site operator. You can recognize an encrypted connection by the fact that the address line of the browser
        changes from &#39;http:&#47;&#47;&#39; to &#39;https:&#47;&#47;&#39; and by the lock symbol in your browser line.
       </p>
        If SSL or TLS encryption is activated, the data you transmit to us cannot be read by third parties.
      </Typography>
      <Typography variant="h4" gutterBottom component="h2" sx={{ mt: 2 }}>
        Data Subject Rights
      </Typography>
      <Typography variant="body1" gutterBottom component="div" sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: 'bold' }}>Right to confirmation</Typography>
        <p>Every data subject has the right to request confirmation from the website operator as to whether personal data concerning him or her are being processed. If you wish to exercise this right of confirmation, you may, at any time, contact the Data Protection Officer.</p>

        <Typography sx={{ fontWeight: 'bold' }}>Right of access</Typography>
        <p>Every person affected by the processing of personal data has the right to receive information free of charge from the operator of this website at any time about the
          personal data stored about him or her and a copy of this information. Furthermore, information may be provided about the following, if applicable: </p>
        <ul>
          <li>the purposes of processing </li>
          <li>the categories of personal data processed</li>
          <li>the recipients to whom the personal data have been or will be disclosed</li>
          <li>if possible, the planned duration for which the personal data will be stored or, if this is not possible, the criteria for determining this duration</li>
          <li>the existence of a right to obtain the rectification or erasure of personal data concerning him or her, or the restriction of processing by the controller,
            or a right to object to such processing</li>
          <li>the existence of a right of appeal to a supervisory authority</li>
          <li>if the personal data are not collected from the data subject: Any available information about the origin of the data.</li>
        </ul>
        <p> Furthermore, the data subject has the right to be informed whether personal data have been transferred to a third country or to an international organization. If this is the case, the data subject also has the right to obtain information about the appropriate safeguards in connection with the transfer.
          If you would like to make use of this right to information, you can contact our data protection officer at any time.</p>

        <Typography sx={{ fontWeight: 'bold' }}>Right to rectification</Typography>
        <p>
        Every person affected by the processing of personal data has the right to demand the immediate correction of incorrect personal data concerning him or her. Furthermore, the data subject has the right, taking into account the purposes of the processing, to request that incomplete personal data be completed, including by means of a supplementary declaration.
        If you wish to exercise this right of rectification, you may contact our data protection officer at any time.</p>

        <Typography sx={{ fontWeight: 'bold' }}>Right to erasure (right to be forgotten)</Typography>
        <p>Any person concerned by the processing of personal data has the right to obtain from the controller of this website the erasure without delay of personal data
        concerning him or her, where one of the following grounds applies and insofar as the processing is no longer necessary:</p>
        <ul>
          <li>The personal data have been collected or otherwise processed for such purposes for which they are no longer necessary.</li>
          <li>The data subject revokes the consent on which the processing was based and there is no other legal basis for the processing</li>
          <li>The data subject objects to the processing on grounds relating to his or her particular situation and there are no overriding legitimate grounds for the processing,
            or the data subject objects to the processing in the case of direct marketing and related profiling</li>
          <li>The personal data have been processed unlawfully</li>
          <li>The erasure of the personal data is necessary for compliance with a legal obligation under Union or Member State law to which the controller is subject</li>
          <li>The personal data has been collected in relation to information society services provided directly to a child</li>
        </ul>
        <p>
        If one of the above reasons applies and you wish to arrange for the deletion of personal data stored by theoperator of this website, you can contact our data protection officer at any time. The data protection officer of this website will arrange for the erasure request to be complied with immediately.
        </p>
        <Typography sx={{ fontWeight: 'bold' }}>Right to restriction of processing</Typography>
        <p>
          Any person concerned by the processing of personal data has the right to obtain from the controller of this website the restriction of processing if one of the
          following conditions is met:</p>
          <ul>
              <li>The accuracy of the personal data is contested by the data subject, for a period enabling the controller to verify the accuracy of the personal data</li>
              <li>The processing is unlawful, the data subject objects to the erasure of the personal data and requests instead the restriction of the use of the personal data</li>
              <li>The controller no longer needs the personal data for the purposes of the processing, but the data subject needs it for the assertion, exercise or defense
                    of legal claims</li>
              <li>The data subject has objected to the processing on grounds relating to his or her particular situation, and it is not yet clear whether the legitimate interests of the
                      controller override those of the data subject</li>
          </ul>
        <p>
          If one of the aforementioned conditions is met, you can request the restriction of personal data stored by the operator of this website at any time by contacting our
            data protection officer. The data protection officer of this website will arrange the restriction of the processing.
        </p>

        <Typography sx={{ fontWeight: 'bold' }}>Right to data portability</Typography>
        <p>Every person affected by the processing of personal data has the right to receive the personal data concerning him or her in a structured, common and machine-readable format. He or she also has the right to have this data transferred to another controller if the legal requirements are met.
        Furthermore, the data subject has the right to obtain that the personal data be transferred directly from one controller to another controller, insofar as this is technically feasible and insofar as this does not adversely affect the rights and freedoms of other persons.
        To assert the right to data portability, you may at any time contact the data protection officer appointed by the operator of this website.</p>

        <Typography sx={{ fontWeight: 'bold' }}>Right of objection</Typography>
        <p>Any person affected by the processing of personal data has the right to object at any time, on grounds relating to his or her particular situation, to the processing of personal data concerning him or her.
        The operator of this website shall no longer process the personal data in the event of the objection, unless we can demonstrate compelling legitimate grounds for the processing which override the interests, rights and freedoms of the data subject, or if the processing serves the purpose of asserting, exercising or defending legal claims.
        To exercise the right to object, you may directly contact the Data Protection Officer of this website.
        Right to revoke consent granted under data protection law
        Every person affected by the processing of personal data has the right to revoke a given consent to the processing of personal data at any time.
        If you wish to exercise your right to revoke consent, you may contact our data protection officer at any time.</p>
      </Typography>
      <div>This privacy policy was generated using: <a href='https://brainbox.swiss/'>BrainBox Solutions</a></div>
    </Container>
  )
}

export default PrivacyPolicy
