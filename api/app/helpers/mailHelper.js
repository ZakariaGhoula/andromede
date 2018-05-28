var fs = require('fs');
var firstMailFr = fs.readFileSync('./static/mails/pdh_fist_mail.html', 'utf8');
var firstMailEn = fs.readFileSync('./static/mails/pdh_fist_mail_en.html', 'utf8');
var firstMail = fs.readFileSync('./static/mails/pdh_first_mail.html', 'utf8');
var MailPasseportFr = fs.readFileSync('./static/mails/pdh_second_mail.html', 'utf8');
var MailPasseportEn = fs.readFileSync('./static/mails/pdh_second_mail_en.html', 'utf8');
var MailJ1Fr = fs.readFileSync('./static/mails/pdh_third_mail.html', 'utf8');
var MailJ1En = fs.readFileSync('./static/mails/pdh_third_mail_en.html', 'utf8');
var MailJ1En = fs.readFileSync('./static/mails/pdh_third_mail_en.html', 'utf8');
var api_key = 'key-047a125595ea20f3e5701222a198d09f';//'key-e0396791f2dc2fb5d58b0b4448002425';
var domain = 'pierresdhistoire.fr';//'arthur.pdh.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var connection = require('./../connection');
var generatePdf = require('./../helpers/generatePdf');
var moment = require('moment');

var createMail = function (data, res, next) {
  console.log(data);
  const endResa = moment(data[0].client_checkout_date);
  const startResa = moment(data[0].client_checkin_date);
  var nbJours = moment.duration(endResa.diff(startResa)).asDays();
  var template = firstMail.toString();
  var str = data[0].email1[0].content;
  if (data[0].lang === 'fr') {
    str = str.replace('{#demeure_name#}', data[0].title);
    if (data[0].gender === 'F' || data[0].gender === 'Mme') {
      str = str.replace('{#Dear#}', 'Chère');
      str = str.replace('{#gender#}', 'Madame');
    } else {
      str = str.replace('{#Dear#}', 'Cher');
      str = str.replace('{#gender#}', 'Monsieur');
    }
  } else if (data[0].lang === 'en') {
    str = str.replace('{#demeure_name#}', data[0].title);
    if (data[0].gender === 'F' || data[0].gender === 'Mme') {
      str = str.replace('{#Dear#}', 'Dear');
      str = str.replace('{#gender#}', 'Madam');
    } else {
      str = str.replace('{#Dear#}', 'Dear');
      str = str.replace('{#gender#}', 'Sir');
    }
  }
  if (typeof data[0].housekeeper !== 'undefined' && typeof data[0].housekeeper.id_housekeeper !== 'undefined') {
    str = str.replace('{#namehousekeeper#}', data[0].housekeeper.first_name);
  } else {
    str = str.replace('{#namehousekeeper#}', '');
  }
  if (typeof data[0].housekeeper !== 'undefined' && typeof data[0].housekeeper.id_housekeeper !== 'undefined') {
    str = str.replace('{#maitressedemaison#}', '<br/>' + data[0].housekeeper.last_name + ' ' + data[0].housekeeper.first_name + ' :' + '<br/>' + 'Mail : ' + data[0].housekeeper.email + '<br/>' + 'Téléphone : ' + data[0].housekeeper.tel_1 + '<br/>');
  } else {
    str = str.replace('{#maitressedemaison#}', '');
  }
  if (typeof data[0].address !== 'undefined' && data[0].address !== null && typeof data[0].address.address !== 'undefined' && data[0].address.address !== null) {
    str = str.replace('{#addresse#}', data[0].address.name + ', ' + data[0].address.address + ' ' + data[0].address.zipcode + ' ' + data[0].address.city);
  } else {
    str = str.replace('{#addresse#}', '');
  }
  str = str.replace('{#numberOfNight#}', nbJours);
  str = str.replace('{#numberofRoom#}', data[0].rooms);
  str = str.replace('{#start_date#}', moment(startResa).format('YYYY-MM-DD'));
  str = str.replace('{#end_date#}', moment(endResa).format('YYYY-MM-DD'));
  str = str.replace('{#totalFacture#}', data[0].price);
  template = template.replace('{#content#}', str);
  template = template.replace('{#title#}', data[0].email1[0].title);

  var send = {
    html: template,
    data: data,
    subject: data[0].email1[0].subject,
  }

  return next(send);
}

exports.createMail = createMail;

var createMail2 = function (data, res, next) {
  const endResa = moment(data[0].client_checkout_date);
  const startResa = moment(data[0].client_checkin_date);
  var nbJours = moment.duration(endResa.diff(startResa)).asDays();
  var template = firstMail.toString();
  var str = data[0].email2[0].content;
  if (data[0].lang === 'fr') {
    str = str.replace('{#demeure_name#}', data[0].title);
    if (data[0].gender === 'M' || data[0].gender === 'Mr') {
      str = str.replace('{#Dear#}', 'Cher');
      str = str.replace('{#gender#}', 'Monsieur');
    } else if (data[0].gender === 'F' || data[0].gender === 'Mme') {
      str = str.replace('{#Dear#}', 'Chère');
      str = str.replace('{#gender#}', 'Madame');
    }
  } else if (data[0].lang === 'en') {
    str = str.replace('{#demeure_name#}', data[0].title);
    if (data[0].gender === 'M' || data[0].gender === 'Mr') {
      str = str.replace('{#Dear#}', 'Dear');
      str = str.replace('{#gender#}', 'Sir');
    } else if (data[0].gender === 'F' || data[0].gender === 'Mme') {
      str = str.replace('{#Dear#}', 'Dear');
      str = str.replace('{#gender#}', 'Madam');
    }
  }
  if (typeof data[0].housekeeper !== 'undefined' && typeof data[0].housekeeper.id_housekeeper !== 'undefined') {
    str = str.replace('{#namehousekeeper#}', data[0].housekeeper.first_name);
  } else {
    str = str.replace('{#namehousekeeper#}', '');
  }
  if (typeof data[0].housekeeper !== 'undefined' && typeof data[0].housekeeper.id_housekeeper !== 'undefined') {
    str = str.replace('{#maitressedemaison#}', '<br/>' + data[0].housekeeper.last_name + ' ' + data[0].housekeeper.first_name + ' :' + '<br/>' + 'Mail : ' + data[0].housekeeper.email + '<br/>' + 'Téléphone : ' + data[0].housekeeper.tel_1 + '<br/>');
  } else {
    str = str.replace('{#maitressedemaison#}', '');
  }
  if (typeof data[0].address !== 'undefined' && data[0].address !== null && typeof data[0].address.address !== 'undefined' && data[0].address.address !== null) {
    str = str.replace('{#addresse#}', data[0].address.name + ', ' + data[0].address.address + ' ' + data[0].address.zipcode + ' ' + data[0].address.city);
  } else {
    str = str.replace('{#addresse#}', '');
  }
  str = str.replace('{#numberOfNight#}', nbJours);
  str = str.replace('{#numberofRoom#}', data[0].rooms);
  str = str.replace('{#start_date#}', moment(startResa).format('DD/MM/YYYY'));
  str = str.replace('{#end_date#}', moment(endResa).format('DD/MM/YYYY'));
  str = str.replace('{#totalFacture#}', data[0].price);

  template = template.replace('{#content#}', str);
  template = template.replace('{#title#}', data[0].email2[0].title);
  var send = {
    html: template,
    data: data,
    subject: data[0].email2[0].subject,
  }
  return next(send);
}

exports.createMail2 = createMail2;


var createMail3 = function (data, res, next) {
  const endResa = moment(data[0].client_checkout_date);
  const startResa = moment(data[0].client_checkin_date);
  var nbJours = moment.duration(endResa.diff(startResa)).asDays();
  var template = firstMail.toString();
  var str = data[0].email3[0].content;
  if (data[0].lang === 'fr') {
    str = str.replace('{#demeure_name#}', data[0].title);
  } else if (data[0].lang === 'en') {
    str = str.replace('{#demeure_name#}', data[0].title);
  }
  if (typeof data[0].housekeeper !== 'undefined' && typeof data[0].housekeeper.id_housekeeper !== 'undefined') {
    str = str.replace('{#namehousekeeper#}', data[0].housekeeper.first_name);
  } else {
    str = str.replace('{#namehousekeeper#}', '');
  }
  if (typeof data[0].housekeeper !== 'undefined' && typeof data[0].housekeeper.id_housekeeper !== 'undefined') {
    str = str.replace('{#maitressedemaison#}', '<br/>' + data[0].housekeeper.last_name + ' ' + data[0].housekeeper.first_name + ' :' + '<br/>' + 'Mail : ' + data[0].housekeeper.email + '<br/>' + 'Téléphone : ' + data[0].housekeeper.tel_1 + '<br/>');
  } else {
    str = str.replace('{#maitressedemaison#}', '');
  }
  if (typeof data[0].address !== 'undefined' && data[0].address !== null && typeof data[0].address.address !== 'undefined' && data[0].address.address !== null) {
    str = str.replace('{#addresse#}', data[0].address.name + ', ' + data[0].address.address + ' ' + data[0].address.zipcode + ' ' + data[0].address.city);
  } else {
    str = str.replace('{#addresse#}', '');
  }
  str = str.replace('{#datePrelevement#}', moment().format('YYYY-MM-DD'));
  template = template.replace('{#content#}', str);
  template = template.replace('{#title#}', data[0].email3[0].title);
  var send = {
    html: template,
    data: data,
    subject: data[0].email3[0].subject,
  }
  return next(send);
}

exports.createMail3 = createMail3;





var createMailRecap = function (data, res, next) {

var template = fs.readFileSync('./static/mails/pdh_remind_30_mail.html', "utf8");
  template = template.replace('{#tab#}', data[0].tab);
  var send = {
    html: template,
    data: data,
    subject: 'RECAP J-30',
  }
  return next(send);
}

exports.createMailRecap = createMailRecap;
var createMailRecap1 = function (data, res, next) {



var template = fs.readFileSync('./static/mails/pdh_remind_1_mail.html', "utf8");
  template = template.replace('{#tab#}', data[0].tab);
  var send = {
    html: template,
    data: data,
    subject: 'RECAP J-1',
  }
  return next(send);
}

exports.createMailRecap1 = createMailRecap1;


var sendMailGun = function fct(send, res, next) {
  var mail = {
    from: 'reservation@pierresdhistoire.fr',
    to: send.data[0].email,
    bcc: 'reservation@pierresdhistoire.fr',
    subject: send.subject,
    html: send.html,
    attachment: typeof send.pdf_path !== 'undefined' ? send.pdf_path.tmpFile : ''
  };
  mailgun.messages().send(mail, function (error, body) {
    if (error) {
      console.log(error);
      return next(error);
    }
    return next(body);
  });
}

exports.sendMailGun = sendMailGun;