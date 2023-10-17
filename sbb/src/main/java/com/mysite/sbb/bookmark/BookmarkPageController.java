package com.mysite.sbb.bookmark;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api")
public class BookmarkPageController {
	
	@GetMapping("/bookmark_form	")
	public String showBookmarkForm() {
		return "bookmark_form";
	}
}