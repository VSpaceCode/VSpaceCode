# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Implement transient menu
- Add `<spc> z` for zoom menu
- Add `<spc> 1...8` to focus different editor groups
- Add `<spc> b` for buffers/editors menu
- Add `<spc> e` for errors menu
- Add `<spc> v` for smart selection
- Add `<spc> *` to find all references
- Add `<spc> !` to show terminal
- Add `<spc> i` for insert menu

### Changed
- `q` is no longer a reserved key to exit menu
- Change the bindings and names in the fold menu to be more aligned with spacemacs
  + Use `c` instead of `f` to close at a point
  + Use `g` instead of `r` to close all regions
  + Use `m` instead of `a` to close all
  + Use `o` instead of `F` to open at a point
  + Use `O` instead of `c` to open recursively
  + Use `G` instead of `R` to open all regions
  + Use `r` instead of `A` to open all
- Change the debug bindings to be more aligned with spcaemacs
  + Use `s` instead of `o` for step over
  + use `o` instead of `O` for step out
  + Add `v` for REPL
  + Add `w` to focus on watch window
  + Add `W` to add to watch

## [0.3.2] - 2020-06-19
### Changed
- Re-release v0.3.2 in `VSpaceCode`