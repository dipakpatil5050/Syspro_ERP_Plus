import { http, whatsapp } from '../API-Interceptor';

class OrderServices {
  sendInquiry(body) {
    return http.post('api/CommonAPI/OrderIndent', body);
  }

  orderPrint(body) {
    return http.post('api/CommonAPI/OrderPrint', body);
  }

  whatsAppFile(token, mobile, pdfPath, remark) {
    return whatsapp.post(`sendFileWithCaption?token=${token}&phone=91${mobile}&link=${pdfPath}&message=${remark}`);
  }

  orderHistory(body) {
    return http.post('api/CommonAPI/OrderHistory', body);
  }
}

export default new OrderServices();
