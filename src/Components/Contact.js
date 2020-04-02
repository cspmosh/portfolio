import React, { Component } from 'react';

class Contact extends Component {

   constructor(props) {
      super(props);
      this.state = { feedback: '', name: '', email: '', emailStatus: '', errorMsg: ''};   
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   } 

   handleSubmit (event) {      
      event.preventDefault();
      const templateId = 'template_1gQu90Ug';
      this.sendFeedback(templateId, {message_html: this.state.feedback, from_name: this.state.name, reply_to: this.state.email})
   }

   handleChange(event) {
      switch(event.target.id){
         case 'contactName':
            this.setState({name: event.target.value});
            break;
         case 'contactEmail':
            this.setState({email: event.target.value});
            break;
         case 'contactSubject':
            this.setState({subject: event.target.value});
            break;
         case 'contactMessage':
            this.setState({feedback: event.target.value});
            break;
         default:
            break;
      }
   } 

   sendFeedback (templateId, variables) {  
      this.setState({emailStatus: 'sending'});    
      window.emailjs.send(
      'gmail', templateId,
      variables
      ).then(res => {      
         this.setState({emailStatus: 'sent'});         
         console.log('Email successfully sent!')
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => {
         this.setState({errorMsg: err.message});
         this.setState({emailStatus: 'error'});
         console.error('Email failed to send:', err);         
      })
   }

  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var message = this.props.data.contactmessage;
    }

    const loaderClass = this.state.emailStatus === 'sending' ? '': 'hide';
    const contactFormClass = this.state.emailStatus === 'sent' ? 'hide' : '';
    const showSuccess = this.state.emailStatus === 'sent' ? '' : 'hide';
    const showError = this.state.emailStatus === 'error' ? '' : 'hide';
    const errorMsg = this.state.errorMsg;
    const isEnabled = this.state.name.length > 0 && this.state.email.length > 0 && this.state.feedback.length > 0;

    return (
      <section id="contact">
         <div className="row section-head">
            <div className="two columns header-col">
               <h1><span>Get In Touch.</span></h1>
            </div>
            <div className="ten columns">
               <p className="lead">{message}</p>
            </div>
         </div>
         <div className="row">
            <div className="eight columns">
               <form id="contactForm" name="contactForm" className={contactFormClass}>
                  <fieldset>
                     <div>
                        <label htmlFor="contactName">Name <span className="required" required>*</span></label>
                        <input type="text" defaultValue="" size="35" id="contactName" name="contactName" required onChange={this.handleChange}/>
                     </div>
                     <div>
                        <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                        <input type="text" defaultValue="" size="35" id="contactEmail" name="contactEmail" onChange={this.handleChange}/>
                     </div>
                     <div>
                        <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                        <textarea cols="50" rows="15" id="contactMessage" name="contactMessage" onChange={this.handleChange} value={this.state.feedback} required></textarea>
                     </div>
                     <div>
                        <input type="button" disabled={!isEnabled} value="Submit" className="submit" onClick={this.handleSubmit} />
                        <span id="image-loader" className={loaderClass}>
                           <img alt="" src="images/loader.gif" />
                        </span>
                     </div>
                  </fieldset>
				   </form>
               <div id="message-warning" className={showError}>{errorMsg}</div>
               <div id="message-success" className={showSuccess}>
                  <i className="fa fa-check"></i>Your message was sent, thank you!<br />
               </div>
            </div>
            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">
                  <h4>Address and Phone</h4>
                  <p className="address">
                     {name}<br />
                     {street} <br />
                     {city}, {state} {zip}<br />
                     <span>{phone}</span>
                  </p>
               </div>
            </aside>
         </div>         
      </section>
    );
  }
}

export default Contact;
