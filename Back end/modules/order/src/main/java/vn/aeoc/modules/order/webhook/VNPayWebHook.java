package vn.aeoc.modules.order.webhook;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import vn.aeoc.modules.order.service.VNPayService;

import java.io.IOException;

@RestController
@AllArgsConstructor
public class VNPayWebHook {
    private final VNPayService vnPayService;
    @GetMapping("/payment/vnpay-payment")
    public void vnpayReturn(HttpServletRequest request, HttpServletResponse response) throws IOException {

        vnPayService.orderReturn(request);
        response.sendRedirect("http://localhost:4200");
    }
}
