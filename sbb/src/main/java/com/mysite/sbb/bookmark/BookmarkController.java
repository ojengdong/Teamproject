package com.mysite.sbb.bookmark;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.ui.Model;


import java.util.List;

@RestController
@RequestMapping("/api")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @Autowired
    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @PostMapping("/bookmarks")
    public void addBookmark(@RequestBody Bookmark bookmarkDto) {
        bookmarkService.addBookmark(bookmarkDto);
    }
    
    @GetMapping("/bookmark_form")
    public String showBookmarkPage(Model model) {
        return "bookmark_form";
    }

    @GetMapping("/bookmarks")
    public String getAllBookmarks() {
        return "/api/bookmark_form";
    }
}

