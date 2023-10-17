package com.mysite.sbb.bookmark;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import org.springframework.ui.Model;


import java.util.List;

@Controller
@RequestMapping("/api")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @Autowired
    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @PostMapping("/bookmarks")
    public ResponseEntity<String> addBookmark(@RequestBody Bookmark bookmarkDto) {
        bookmarkService.addBookmark(bookmarkDto);
        return ResponseEntity.ok("북마크가 추가되었습니다.");
    }
    
    @GetMapping("/bookmarks")
    public String getAllBookmarks(Model model) {
        List<Bookmark> bookmarks = bookmarkService.getAllbookmarks();
        model.addAttribute("bookmarks", bookmarks);
        return "bookmark_form";
    }
}

