use std::fs::File;
use std::io::BufReader;
use std::io::BufRead;

fn main() {
  // --snip--
  // let args: Vec<String> = env::args().collect();

  // let query = &args[1];
  // let filename = &args[2];

  // println!("Searching for {}", query);
  // println!("In file {}", filename);

  let contents = load_from_file("./inputs/test.txt");
  // let part1Answer =  part1(contents);
  // println!("Part 1 {}", part1Answer);
  let part2Answer =  part2(contents);
  println!("Part 2 {}", part2Answer);
}

#[derive(Debug)]
struct Command {
}

fn part1(input: Vec<i32>) -> i32 {
  return -1
}

fn part2(input: Vec<i32>) -> i32 {
  return -1
}

fn load_from_file(file_path: &str) -> Vec<i32> {//, vec<vec<i32>>) {
  let file = File::open(file_path).expect("file wasn't found.");
  let reader = BufReader::new(file);

  let mut lines: Vec<String> = reader
      .lines()
      .map(|line| line.expect("Could not parse line"))
      .collect();
  let mut first_line: Vec<&str> = lines[0].split(',').collect();
  println!("firstLine {:?}", first_line);
  lines.remove(0);
  let numbers: Vec<i32> = Vec::new(); //= firstLine.pop().map(|line| line.split(',').unwrap().parse::<i32>()).collect();

  // remvove first empty line
  // let mut allBoards = Vec::new();
  let mut board : Vec<Vec<&str>> = Vec::new();
  lines.remove(0);
  board.push(vec![vec![""]]);
  println!("lines {:?}", lines);
  for line in lines {
    if line != "" {
      let mut row: Vec<&str> = line.split_whitespace().collect();
      println!("row {:?}", &row);
      board.append(&row);
    }
    else {
      println!("board {:?}", board);
      // allBoards.push(board);
      // clear vec
      board = vec![vec![""]];
    }
    // let com = line.split_whitespace().next().next();
  }
  // println!("boards {:?}", allBoards);
  
  return numbers;
}